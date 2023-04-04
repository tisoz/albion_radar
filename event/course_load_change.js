class Course_load_change {
    constructor() {
        // {"0":2311,"1":1,"2":2,"252":42}
        // {"0":2311,"2":2,"252":42}
        // {"0":2311,"2":0,"252":42}
        this.id = 0;        //物资ID
        this.quality = 0;   //物品品质
        this.count = 0;     //剩余数量
    }

    parse(data) {

        this.id = data[0];        //物资ID
        this.quality = data[2] || 0;   //物品品质
        this.count = data[1] || 0;     //剩余数量

        // console.log(JSON.stringify(this))
        global.web_content.send("course_item", this)

    }

}

module.exports = Course_load_change;