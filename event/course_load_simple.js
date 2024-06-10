class Course_load_simple {
    constructor() {
        this.id = 0;        //物资ID
        this.type = 0;      //物资类型
        this.level = 0;
        this.quality = 0;     //物资品质
        this.position = []  //物资位置
        this.count = 0;     //剩余数量
    }

    parse(data) {
        this.id = data[0];
        this.type = data[5];
        this.level = data[7];
        this.quality = data[11] || 0;
        this.position = [data[8][0], data[8][1]]
        this.count = data[10] || 0
        // console.log(JSON.stringify(data))
        global.web_content.send("course_item", this)

    }

}

module.exports = Course_load_simple;