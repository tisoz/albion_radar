class player_postion_send {
    constructor() {
        this.current_postion = [];      //当前坐标
        this.unknow2 = 0;               //未知字段2
        this.target_position = []       //目标坐标
        this.unknow4 = 0;               //未知字段4
    }

    parse(data) {
        this.current_postion = [data[1][0], data[1][1]];       //物资类型
        this.unknow2 = data[2];               //品质等级
        this.target_position = [data[3][0], data[3][1]]       //物资位置
        this.unknow4 = data[4];               //剩余数量
        console.log("position", JSON.stringify(this))
    }
}
module.exports = player_postion_send;