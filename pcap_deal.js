globalThis['item_list'] ||= {};
globalThis['monster_list'] ||= {};
globalThis['player_list'] ||= {};
globalThis['dungeon_list'] ||= {};
globalThis['chest_list'] ||= {};
globalThis['temp_list'] ||= {};
globalThis['local_player_position'] ||= {current_postion: [0, 0]}
globalThis['current_map'] ||= {
    '@rareresourcedistribution': "",
    "@type": ""
}
// globalThis['monster_white_list'] = {
//     860: "纵火怪"
// }

function findall(regex, text) {
    let arr = [...text.matchAll(regex)]
    arr = Array.from(arr, x => x[arr[0].length - 1])
    return arr;
}

ipcRenderer.on("local_player_position", (event, data) => {
    globalThis['local_player_position'] = data;
})
ipcRenderer.on("map_load", (event, data) => {
    global.clear_data = true
})
ipcRenderer.on("monster_load", (event, data) => {

    console.log(data)
    // if (!data['hp']) data['hp'] = 0
    if (data['hp'] && data['hp'] >= 11 && data['hp'] <= 100) return

    globalThis['monster_list'][data['id']] ||= {};
    data = Object.assign(globalThis['monster_list'][data['id']], data);
    data['uni_id'] = "monster.png";
    data['name'] = mobs_list[data['type'] - 2]['@namelocatag'] || `@MOB_${mobs_list[data['type'] - 2]['@uniquename']}` || ""; //英文串
    if (data['name'].indexOf("BOSS") + 1) data['quality'] = 1;
    data['name'] = name_tag_list[data['name']]
    switch (data['name']) {
        case "鬼火":
            data['name'] = "小鬼火"
            data['uni_id'] = "mist_mob.png"
            break

        case "大鬼火":
            data['uni_id'] = "mist_mob.png"
            break

        case "水晶蜘蛛":
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
    }
    if (mobs_list[data['type'] - 2]['Loot'] && mobs_list[data['type'] - 2]['Loot']['LootListReference']) {
        if (mobs_list[data['type'] - 2]['Loot']['LootListReference'] instanceof Array)
            for (let i of mobs_list[data['type'] - 2]['Loot']['LootListReference']) {
                if (i['@name'].indexOf("DIRECTLOOTDROP_GATHERER") + 1) {
                    let name = findall(/T(\d)_DIRECTLOOTDROP_GATHERER_(\S+)/g, i['@name'])[0]
                    let level = findall(/T(\d)_DIRECTLOOTDR/g, i['@name'])[0]

                    data['resource'] = name;
                    data['level'] = level;
                    data['res_id'] = `T${data['level']}_${data['resource']}_LEVEL${data['quality']}@${data['quality']}`;
                    data['res_id'] = data['res_id'].replaceAll("_LEVEL0@0", "");

                    switch (name) {
                        case "WOOD":
                            name = "木头";
                            break
                        case "ORE":
                            name = "矿石";
                            break
                        case "HIDE":
                            name = "皮革";
                            break
                        case "FIBER":
                            name = "棉花";
                            break
                        case "ROCK":
                            name = "石头";
                            break
                    }
                    data['resource'] = name;
                }
            }
    }

    globalThis['monster_list'][data['id']] = Object.assign(globalThis['monster_list'][data['id']], data);

})
ipcRenderer.on("other_player_load", (event, data) => {

    // this.id = data[0];        //物资ID
    // this.name = data[1];        //名称
    // this.hp = data[19]
    // this.hp_max = data[20]
    // this.lp = data[23]
    // this.lp_max = data[24]
    // this.position = data[13];  //玩家位置
    // this.backpack = data[34]  //玩家装备
    globalThis.config ||= {}
    globalThis['player_list'][data['id']] ||= {};
    data = Object.assign(globalThis['player_list'][data['id']], data);
    data['uni_id'] = "player_green.png"
    if (!data['name']) return
    switch (data['obj'][46]) {
        case 255:
            data['uni_id'] = "player_red.png"
            break;
        default:
            data['uni_id'] = "player_green.png";
            break;
    }
    if (current_map && current_map['@rareresourcedistribution']) {
        if (current_map['@rareresourcedistribution'].indexOf("RED") + 1
            || current_map['@rareresourcedistribution'].indexOf("OUT") + 1
            || (current_map['@type'].indexOf("BLACK") + 1)
            || (current_map['@type'].indexOf("RED") + 1)) {
            data['uni_id'] = "player_red.png";
        }
    }
    if (data['mounted'] && config['filter_show_player_in_danger_show_green']) {
        data['uni_id'] = "player_green.png";
    }

    globalThis['player_list'][data['id']] = Object.assign(globalThis['player_list'][data['id']], data);
})
ipcRenderer.on("move_event", (event, data) => {
    //怪物数据
    if (data.id in monster_list) {
        monster_list[data.id] = Object.assign(monster_list[data.id], data)
    }
    if (data.id in player_list) {
        player_list[data.id] = Object.assign(player_list[data.id], data)
    }
})
ipcRenderer.on("leave_event", (event, data) => {
    //怪物数据
    if (data.id in monster_list) {
        if (monster_list[data.id]['in_container']) {
            container.removeChild(container.getChildByName(data.id.toString()))
        }
        delete monster_list[data.id]
    }
    if (data.id in dungeon_list) {
        if (dungeon_list[data.id]['in_container']) {
            container.removeChild(container.getChildByName(data.id.toString()))
        }
        delete dungeon_list[data.id]
    }
    if (data.id in player_list) {
        if (player_list[data.id]['in_container']) {
            container.removeChild(container.getChildByName(data.id.toString()))
            backpack_container.removeChild(backpack_container.getChildByName(data.id.toString()))
        }
        delete player_list[data.id]
    }
    if (data.id in chest_list) {
        if (chest_list[data.id]['in_container']) {
            container.removeChild(container.getChildByName(data.id.toString()))
        }
        delete chest_list[data.id]
    }
    if (data.id in temp_list) {
        if (temp_list[data.id]['in_container']) {
            container.removeChild(container.getChildByName(data.id.toString()))
        }
        delete temp_list[data.id]
    }
})
ipcRenderer.on("course_item", (event, data) => {
    globalThis['item_list'][data['id']] ||= {};
    // console.log(data)
    data = Object.assign(globalThis['item_list'][data['id']], data);

    // 加载图片id
    switch (data['type']) {
        case 23:
            data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
            break
        case 0:
            data['uni_id'] = `T${data['level']}_WOOD_LEVEL${data['quality']}@${data['quality']}`;
            break
        case 17:
            data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
            data['uni_id'] = "UNIQUE_HIDEOUT"

            break
        case 6:
            data['uni_id'] = `T${data['level']}_ROCK_LEVEL${data['quality']}@${data['quality']}`;
            break
        case 12:
            data['uni_id'] = `T${data['level']}_FIBER_LEVEL${data['quality']}@${data['quality']}`;
            break;
        default:
            // console.log("type", data['type'])
            data['uni_id'] = "UNIQUE_HIDEOUT"
            break
    }
    data['uni_id'] = data['uni_id'].replaceAll("_LEVEL0@0", "");
    globalThis['item_list'][data['id']] = Object.assign(globalThis['item_list'][data['id']], data);

})

ipcRenderer.on("dungeon_load", (event, data) => {
    console.log(data)
    globalThis['dungeon_list'][data['id']] ||= {};
    data = Object.assign(globalThis['dungeon_list'][data['id']], data);

    data['uni_id'] = `dungeon_${data['quality']}.png`
    if (data['obj']['8']) data['name'] = "腐蚀地下城"
    if (data['obj']['9']) data['name'] = "2V2炼狱之门"
    if (data['type'] === 2) data['name'] = "团队地下城"
    if (data['name'].indexOf("SOLO") + 1 && data['type'] === 1) data['name'] = "单人地下城";
    globalThis['dungeon_list'][data['id']] = Object.assign(globalThis['dungeon_list'][data['id']], data);

})
ipcRenderer.on("chest_load", (event, data) => {
    console.log(data)
    globalThis['chest_list'][data['id']] ||= {};
    data = Object.assign(globalThis['chest_list'][data['id']], data);

    if (data['quality'] > 4) data['quality'] = 1;
    if (data['name'].indexOf("STANDARD") + 1) data['quality'] = 1;
    if (data['name'].indexOf("UNCOMMON") + 1) data['quality'] = 2;
    if (data['name'].indexOf("RARE") + 1) data['quality'] = 3;
    if (data['name'].indexOf("LEGENDARY") + 1) data['quality'] = 4;
    data['uni_id'] = `chest_${data['quality']}.png`

    globalThis['chest_list'][data['id']] = Object.assign(globalThis['chest_list'][data['id']], data);

})

ipcRenderer.on("cage_load", (event, data) => {
    // console.log(data)
    globalThis['temp_list'][data['id']] ||= {};
    data = Object.assign(globalThis['temp_list'][data['id']], data);

    if (data['name'].indexOf("FILL_CAGE") + 1) {
        data['uni_id'] = `heretic.png`;
        data['name'] = "灯笼怪"
    }

    globalThis['temp_list'][data['id']] = Object.assign(globalThis['temp_list'][data['id']], data);

})
ipcRenderer.on("map_load", (event, data) => {
    if (data['id'].toString().indexOf("MIST") + 1) return
    globalThis['current_map'] = world_list[data['id']] || current_map
})