class Course_load_list {
    constructor() {
        this.id = 0;        //物资ID
        this.type = 0;      //物资类型
        this.level = 0;     //品质等级
        this.position = []  //物资位置
        this.count = 0;     //剩余数量
    }

    parse(data) {

        for (let i = 0; i < data[0].length; i++) {
            this.id = data[0][i];
            this.type = data[1][i];
            this.level = data[2][i];
            this.position = [data[3][i * 2], data[3][i * 2 + 1]]
            this.count = data[4][i];
            let item = JSON.parse(JSON.stringify(this))
            global.item_list[this.id] = item
        }

    }

}

module.exports = Course_load_list;