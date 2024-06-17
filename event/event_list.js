let course_done = require("./course_done.js")
let course_load_list = require("./course_load_list.js")
let course_load_simple = require("./course_load_simple.js")
let course_load_change = require("./course_load_change.js")
let other_player_load = require("./other_player_load.js")
let monster_quality_change = require("./monster_quality_change.js")
let map_change = require("./map_change.js")
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
    29: other_player_load,
    39: course_load_list,
    40: course_load_simple,
    46: course_load_change,
    47: monster_quality_change,
    61: course_done,
    90: new_monster_damage, //新怪物攻击事件

    94: monster_normal_move_change,             //脱战事件
    102: club_load,

    122: monster_load,
    205: firstmounted,
    206: secondmounted,
    225: firend_list,
    234: firend_load,
    313: dungeon,
    339: filter,
    344: filter,//钓鱼
    382: chest_load,
    508: map_change,//传送阵传送
    519: cage_load,//灯笼怪
    520: cage_free,
    20: filter,//钓鱼
}
module.exports = event_list;