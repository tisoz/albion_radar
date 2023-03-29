class Course_done {
    constructor() {
        this.id = 0;
        this.uid = 0;
        this.more_count = 0;    //额外采集
        this.vip_count = 0;     //VIP采集
        this.count = 0;         //剩余数量
    }

    parse(data) {
        this.id = data[3];
        this.uid = data[4];
        this.more_count = data[6];
        this.vip_count = data[7];
        this.count = data[8];
    }

}

module.exports = Course_done;