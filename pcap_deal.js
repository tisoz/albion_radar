globalThis['item_list'] ||= {};
globalThis['monster_list'] ||= {};
globalThis['local_player_position'] ||= {}
ipcRenderer.on("local_player_position", (event, data) => {
    globalThis['local_player_position'] = data;
})
ipcRenderer.on("monster_load", (event, data) => {
    data['uni_id'] = "UNIQUE_HIDEOUT";

    globalThis['monster_list'][data['id']] ||= {};
    Object.assign(globalThis['monster_list'][data['id']], data);

})

ipcRenderer.on("course_item", (event, data) => {
    globalThis['item_list'][data['id']] ||= {};
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
