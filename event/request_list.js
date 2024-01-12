let player_postion_send = require("./player_postion_send.js")
let map_load = require("./map_load.js")
let Join_map = require("./join_map.js")
let request_list = {
    2: Join_map,
    21: player_postion_send,
    35: map_load
}
module.exports = request_list;