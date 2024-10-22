globalThis['item_list'] ||= {};
globalThis['monster_list'] ||= {};
globalThis['player_list'] ||= {};
globalThis['white_player_list'] ||= [];
globalThis['dungeon_list'] ||= {};
globalThis['chest_list'] ||= {};
globalThis['temp_list'] ||= {};
globalThis['local_player_position'] ||= {current_postion: [0, 0]}
globalThis['current_map'] ||= {
    '@rareresourcedistribution': "",
    "@type": ""
}
globalThis['white_road'] = []
globalThis['black_road'] = []
globalThis['temp_road'] = []
globalThis['log_info'] = {}
globalThis['local_player_center_postion'] = [0, 0]

function findall(regex, text) {
    let arr = [...text.matchAll(regex)]
    arr = Array.from(arr, x => x[arr[0].length - 1])
    return arr;
}

function check_point(point) {
    let result = false;
    for (let i of white_road) {
        if (Math.abs(point[0] - i[0]) > 5) continue
        if (Math.abs(point[1] - i[1]) > 5) continue
        result = true
    }
    for (let i of black_road) {
        if (Math.abs(point[0] - i[0]) > 6) continue
        if (Math.abs(point[1] - i[1]) > 6) continue
        result = true
    }
    // 返回true代表周围存在近距离点位
    return result
}

function del_range_point(point, meter) {
    let temp = []
    for (let index in white_road) {
        let i = white_road[index]
        if (Math.abs(point[0] - i[0]) > meter) continue
        if (Math.abs(point[1] - i[1]) > meter) continue
        temp.push(index);
    }
    temp.reverse()
    for (let index of temp) {
        let item = white_road[index];
        let hashid = item.toString().replaceAll("-", "").replaceAll(",", "").replaceAll(".", "").substring(1, 10);
        // container.removeChild(container.getChildByName(hashid))
        white_road.splice(index, 1)
    }
}

function get_speed(temp) {
    let base = temp[0] || [0, 0];
    let speed = 0;
    for (let i of temp) {
        let dist = Math.sqrt(Math.pow(i[0] - base[0], 2) + Math.pow(i[1] - base[1], 2));
        speed += dist
        base = i;
    }
    return (speed / (temp.length - 1) * 10).toFixed(4)
}

function rotatePoint(x1, y1, angle) {
    const radians = (Math.PI / 180) * angle;
    const cosTheta = Math.cos(radians);
    const sinTheta = Math.sin(radians);

    const x2 = x1 * cosTheta - y1 * sinTheta;
    const y2 = x1 * sinTheta + y1 * cosTheta;

    return [x2, y2];
}

function monster_load(data) {
    if (data['hp'] && data['hp'] >= 11 && data['hp'] <= 100) return
    let mob_left = 14;
    globalThis['monster_list'][data['id']] ||= {};
    data = Object.assign(globalThis['monster_list'][data['id']], data);
    data['uni_id'] = "monster.png";
    data['name'] = mobs_list[data['type'] - mob_left]['@namelocatag'] || `@MOB_${mobs_list[data['type'] - mob_left]['@uniquename']}` || ""; //英文串
    if (data['name'].indexOf("BOSS") + 1) data['quality'] = 1;
    data['name'] = name_tag_list[data['name']]
    switch (data['name']) {
        case lan_data['solo_wisp']:
            data['uni_id'] = "mist_mob.png"
            break
        case lan_data['duo_wisp']:
            data['uni_id'] = "mist_mob.png"
            break
        case lan_data['avalon_robot']:
            data['quality'] = 3;
            break
        case lan_data['roming_chest']:
            data['quality'] = 3;
            data['chest'] = true;
            break
        case lan_data['anniversary_place']:
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
        case lan_data['egg']:
            data['uni_id'] = "egg.png";
            data['quality'] = 4;
            break
        case lan_data['might_spider']:
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
        case lan_data['mist_dragon']:
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
        case lan_data['mist_spider']:
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
        case lan_data['mist_griffin']:
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
        case lan_data['soldier_boss']:
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
        case lan_data['personal_spider']:
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
    }
    if (mobs_list[data['type'] - mob_left]['Loot'] && mobs_list[data['type'] - mob_left]['Loot']['LootListReference']) {
        if (mobs_list[data['type'] - mob_left]['Loot']['LootListReference'] instanceof Array)
            for (let i of mobs_list[data['type'] - mob_left]['Loot']['LootListReference']) {
                if (i['@name'].indexOf("DIRECTLOOTDROP_GATHERER") + 1) {
                    let name = findall(/T(\d)_DIRECTLOOTDROP_GATHERER_(\S+)/g, i['@name'])[0]
                    let level = findall(/T(\d)_DIRECTLOOTDR/g, i['@name'])[0]

                    data['resource'] = name;
                    data['level'] = level;
                    data['res_id'] = `T${data['level']}_${data['resource']}_LEVEL${data['quality']}@${data['quality']}`;
                    data['res_id'] = data['res_id'].replaceAll("_LEVEL0@0", "") + ".png";
                    data['res_type'] = name;
                    data['resource_type'] = name.toLowerCase()
                    switch (name) {
                        case "WOOD":
                            name = lan_data['wood'];
                            break
                        case "ORE":
                            name = lan_data['mineral'];
                            break
                        case "HIDE":
                            name = lan_data['leather'];
                            break
                        case "FIBER":
                            name = lan_data['cotton'];
                            break
                        case "ROCK":
                            name = lan_data['stone'];
                            break
                    }
                    data['resource'] = name;
                }
            }
    }

    globalThis['monster_list'][data['id']] = Object.assign(globalThis['monster_list'][data['id']], data);

}

try {
    ipcRenderer.on("local_player_position", (event, data) => {
        // console.log(data['current_postion'])
        temp_road.push(data['current_postion'])
        // 判断是否发生漏载数据位移
        if (Math.sqrt(Math.pow(local_player_position['current_postion'][0] - data['current_postion'][0], 2) + Math.pow(local_player_position['current_postion'][1] - data['current_postion'][1], 2)) > 20) {
            if (new Date().getTime() - current_map['update_time'] > 10) {
                globalThis['local_player_position'] = {current_postion: [0, 0]}
                globalThis['clear_data'] = true
            }
        }
        data['speed'] = get_speed(temp_road)
        if (temp_road.length > 5) {
            temp_road.shift()
            // if (data['speed'] < 1) {
            //     let point = local_player_position['current_postion']
            //     del_range_point(point, 6);
            //     if (!check_point(data['current_postion'])) {
            //         black_road.push(data['current_postion'])
            //         let temp_text = new PIXI.Text(`*`, {
            //             fontFamily: 'JetBrainsMono-Bold',
            //             fontSize: 14,
            //             fill: "red",
            //         });
            //         temp_text.anchor.set(0.5);
            //         temp_text.scale.x = 1 / 5
            //         temp_text.scale.y = 1 / 5
            //         temp_text.position.set(-data['current_postion'][0], data['current_postion'][1])
            //         temp_text.name = point.toString().replaceAll("-", "").replaceAll(",", "").replaceAll(".", "").substring(1, 10)
            //         // temp_text.x = ;
            //         // container.addChild(temp_text)
            //     }
            // }
        }
        globalThis['local_player_position'] = data;
        globalThis['local_player_center_postion'] = rotatePoint(data['current_postion'][0], -data['current_postion'][1], 135)
        // if (!check_point(data['current_postion'])) {
        //     white_road.push(data['current_postion'])
        //     let temp_text = new PIXI.Text(`*`, {
        //         fontFamily: 'JetBrainsMono-Bold',
        //         fontSize: 14,
        //         fill: "green",
        //     });
        //     temp_text.anchor.set(0.5);
        //     temp_text.scale.x = 1 / 5
        //     temp_text.scale.y = 1 / 5
        //     temp_text.position.set(-data['current_postion'][0], data['current_postion'][1])
        //     temp_text.name = data['current_postion'].toString().replaceAll("-", "").replaceAll(",", "").replaceAll(".", "").substring(1, 10)
        //     // temp_text.x = ;
        //     // container.addChild(temp_text)
        // }
    })
    ipcRenderer.on("monster_load", (event, data) => {
        monster_load(data)
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
        console.log(data.id, data)
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
            let temp = `${current_map['@rareresourcedistribution']}${current_map['@type']}${current_map['@id']}`
            if (temp.indexOf("RED") + 1
                || temp.indexOf("OUT") + 1
                || temp.indexOf("BLACK") + 1
                || temp.indexOf("RED") + 1) {
                data['uni_id'] = "player_red.png";
            }
        }
        if (data['mounted'] && config['filter_show_player_in_danger_show_green']) {
            data['uni_id'] = "player_green.png";
        }
        if (globalThis['white_player_list'].indexOf(data['name']) + 1) data['uni_id'] = "player_green.png";

        globalThis['player_list'][data['id']] = Object.assign(globalThis['player_list'][data['id']], data);
    })
    ipcRenderer.on("move_event", (event, data) => {
        //怪物数据
        // let buffer = new ArrayBuffer(data['data'][1].length); // 创建一个长度为4个字节的缓冲区
        // let view = new DataView(buffer);
        //
        // for (let i = 0; i < data['data'][1].length; i++) {
        //     view.setUint8(i, data['data'][1][i]);
        // }
        // console.log(data.id, data) //sudu
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

            case 0:
                data['resource_type'] = "wood";
                data['uni_id'] = `T${data['level']}_WOOD_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 1:
                data['resource_type'] = "wood";
                data['uni_id'] = `T${data['level']}_WOOD_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 2:
                data['resource_type'] = "wood";
                data['uni_id'] = `T${data['level']}_WOOD_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 3:
                data['resource_type'] = "wood";
                data['uni_id'] = `T${data['level']}_WOOD_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 4:
                data['resource_type'] = "wood";
                data['uni_id'] = `T${data['level']}_WOOD_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 5:
                data['resource_type'] = "wood";
                data['uni_id'] = `T${data['level']}_WOOD_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 6:
                data['resource_type'] = "rock";
                data['uni_id'] = `T${data['level']}_ROCK_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 7:
                data['resource_type'] = "rock";
                data['uni_id'] = `T${data['level']}_ROCK_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 8:
                data['resource_type'] = "rock";
                data['uni_id'] = `T${data['level']}_ROCK_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 9:
                data['resource_type'] = "rock";
                data['uni_id'] = `T${data['level']}_ROCK_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 10:
                data['resource_type'] = "rock";
                data['uni_id'] = `T${data['level']}_ROCK_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 11:
                data['resource_type'] = "rock";
                data['uni_id'] = `T${data['level']}_ROCK_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 12:
                data['resource_type'] = "fiber";
                data['uni_id'] = `T${data['level']}_FIBER_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 13:
                data['resource_type'] = "fiber";
                data['uni_id'] = `T${data['level']}_FIBER_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 14:
                data['resource_type'] = "fiber";
                data['uni_id'] = `T${data['level']}_FIBER_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 15:
                data['resource_type'] = "fiber";
                data['uni_id'] = `T${data['level']}_FIBER_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 16:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 17:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 18:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 19:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 20:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 21:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 22:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 23:
                data['resource_type'] = "ore";
                data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 24:
                data['resource_type'] = "ore";
                data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 25:
                data['resource_type'] = "ore";
                data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 26:
                data['resource_type'] = "ore";
                data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 27:
                data['resource_type'] = "ore";
                data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 28:
                data['resource_type'] = "ore";
                data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 43:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
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
        if (data['quality'] === true) data['quality'] = 0;
        data['uni_id'] = `dungeon_${data['quality']}.png`
        if (data['obj']['8']) data['name'] = lan_data['corrupted']
        if (data['obj']['9']) data['name'] = lan_data['hellgate2v2']
        if (data['type'] === 2) data['name'] = lan_data['groupdungeon']
        if (data['type'] === 3732) data['name'] = lan_data['downhouse']
        if (data['obj']['17'] === 6) data['name'] = lan_data['downhouse']
        if (data['name'].indexOf("SOLO") + 1 && data['type'] === 1) data['name'] = lan_data['solodungeon'];
        globalThis['dungeon_list'][data['id']] = Object.assign(globalThis['dungeon_list'][data['id']], data);

    })
    ipcRenderer.on("club_load", (event, data) => {
        globalThis.club = data['club']
        globalThis.union = data['union']
        // club = "Sun Never Set"
    })
    ipcRenderer.on("friend_load", (event, data) => {
        for (let name of data['friend_list']) {
            if (white_player_list.indexOf(name) + 1) continue
            white_player_list.push(name)
        }
    })
    ipcRenderer.on("chest_load", (event, data) => {
        // console.log(data)
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
            data['name'] = lan_data['mob_cage']
        }

        globalThis['temp_list'][data['id']] = Object.assign(globalThis['temp_list'][data['id']], data);

    })
    ipcRenderer.on("photo", (event, data) => {
        try {
            let info = JSON.parse(data)
            log_info[info['252']] ||= []
            if (log_info[info['252']].length === 0) console.log(info['252'], info)
            log_info[info['252']].push(info)
        } catch (e) {
            console.log(data)
        }

    })
    ipcRenderer.on("map_load", (event, data) => {
        globalThis['local_player_position'] = {current_postion: [0, 0]}

        if (data['id'] === current_map['@id']) return
        global.clear_data = true
        if (typeof data['id'] != "string") return
        if (data['id'].indexOf("MIST") + 1) {
            data['id'] = "MIST_" + data['type']
            current_map['@rareresourcedistribution'] = data['id']
        }
        temp_road = []
        let new_map = world_list[data['id']] || {};
        new_map['@id'] ||= data['id']
        if (!new_map['@rareresourcedistribution']) new_map['@rareresourcedistribution'] = current_map['@rareresourcedistribution']
        if (!new_map['@type']) new_map['@type'] = current_map['@type']
        if (!new_map['@displayname']) new_map['@displayname'] = data['id']
        new_map['update_time'] = new Date().getTime()
        globalThis['current_map'] = new_map;

    })
} catch (e) {
    let formData = new FormData();
    formData.append('type', 3);
    formData.append('text', `pcap error ${e} ${e.stack}`);
    globalThis.update_time = new Date().getTime()
    console.log(e)
}
