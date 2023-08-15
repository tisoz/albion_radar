let course_done = require("./course_done.js")
let course_load_list = require("./course_load_list.js")
let course_load_simple = require("./course_load_simple.js")
let course_load_change = require("./course_load_change.js")
let other_player_load = require("./other_player_load.js")
let monster_quality_change = require("./monster_quality_change.js")
let map_load = require("./map_load.js")
let move_event = require("./move_event.js")
let leave_event = require("./leave_event.js")
let monster_normal_move_change = require("./monster_normal_move_change.js")
let monster_load = require("./monster_load.js")
let dungeon = require("./dungeon.js")
let chest_load = require("./chest_load.js")
let firstmounted = require("./firstmounted.js")
let secondmounted = require("./secondmounted.js")
let cage_load = require("./cage_load.js")
let cage_free = require("./cage_free.js")
let damage = require("./damage.js")
let new_monster_damage = require("./new_monster_damage.js")
let club_load = require("./club_load.js")
let firend_load = require("./firend_load.js")
let firend_list = require("./firend_list.js")
let filter = require("./filter.js")

let event_list = {
    1: leave_event, //玩家离开事件
    3: move_event,
    6: damage, //攻击伤害事件
    10: filter,
    18: filter, //待处理
    21: filter,//路上装饰
    27: other_player_load,
    35: course_load_list,
    36: course_load_simple,
    42: course_load_change,
    43: monster_quality_change,
    57: course_done,
    86: new_monster_damage, //新怪物攻击事件

    90: monster_normal_move_change,             //脱战事件
    98: club_load,

    117: monster_load,
    200: firstmounted,
    201: secondmounted,
    220: firend_list,
    229: firend_load,
    308: dungeon,
    337: filter,
    342: filter,//钓鱼
    377: chest_load,
    511: cage_load,//灯笼怪
    512: cage_free,
    20: filter,//钓鱼
}
module.exports = event_list;