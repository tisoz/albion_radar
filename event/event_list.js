let course_done = require("./course_done.js")
let course_load_list = require("./course_load_list.js")
let course_load_simple = require("./course_load_simple.js")

let event_list = {
    35: course_load_list,
    36: course_load_simple,
    57: course_done
}
module.exports = event_list;