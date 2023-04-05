globalThis['item_list'] ||= {};
globalThis['monster_list'] ||= {};
globalThis['player_list'] ||= {};
globalThis['local_player_position'] ||= {current_postion: [0, 0]}
ipcRenderer.on("local_player_position", (event, data) => {
    globalThis['local_player_position'] = data;
})
ipcRenderer.on("map_load", (event, data) => {
    global.clear_data = true
})
ipcRenderer.on("monster_load", (event, data) => {

    // console.log(data)
    if (!data['hp']) return
    if (data['hp'] === 20) return

    globalThis['monster_list'][data['id']] ||= {};
    switch (data['type']) {
        case 2:
            data['uni_id'] = "mist_mob.png"
            break;
        default:
            data['uni_id'] = "monster.png";
            break;
    }
    Object.assign(globalThis['monster_list'][data['id']], data);

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
    // console.log(data)
    globalThis['player_list'][data['id']] ||= {};
    switch (data['obj'][46]) {
        case 255:
            data['uni_id'] = "player_red.png"
            break;
        default:
            data['uni_id'] = "player_green.png";
            break;
    }
    Object.assign(globalThis['player_list'][data['id']], data);

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
    if (data.id in player_list) {
        if (player_list[data.id]['in_container']) {
            container.removeChild(container.getChildByName(data.id.toString()))
        }
        delete player_list[data.id]
    }
})
ipcRenderer.on("course_item", (event, data) => {
    globalThis['item_list'][data['id']] ||= {};
    console.log(data)
    Object.assign(globalThis['item_list'][data['id']], data);

    data = globalThis['item_list'][data['id']];
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
            console.log("type", data['type'])
            data['uni_id'] = "UNIQUE_HIDEOUT"
            break
    }
    globalThis['item_list'][data['id']]['uni_id'] = data['uni_id'].replaceAll("_LEVEL0@0", "");

})

// ipcRenderer.on("course_item_quality", (event, data) => {
//     globalThis['item_list'][data['id']]['quality'] = data['quality']
// })
