let course_done = require("./course_done.js")
let course_load_list = require("./course_load_list.js")
let course_load_simple = require("./course_load_simple.js")
let course_load_change = require("./course_load_change.js")
let other_player_load = require("./other_player_load.js")
let monster_load = require("./monster_load.js")
let filter = require("./filter.js")

let event_list = {
    1: filter, //玩家离开事件
    6: filter, //攻击伤害事件
    27: other_player_load,
    35: course_load_list,
    36: course_load_simple,
    42: course_load_change,
    57: course_done,
    98: filter,

    117: monster_load,

}
module.exports = event_list;