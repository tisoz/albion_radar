class Course_load_simple {
    constructor() {
        this.id = 0;        //物资ID
        this.type = 0;      //物资类型
        this.level = 0;     //品质等级
        this.position = []  //物资位置
        this.count = 0;     //剩余数量
    }

    parse(data) {
        this.id = data[0];
        this.type = 0;
        this.level = data[10]
        this.position = [data[8][0], data[8][1]]
        this.count = data[11]

    }

}

module.exports = Course_load_simple;