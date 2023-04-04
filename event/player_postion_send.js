class player_postion_send {
    constructor() {
        this.current_postion = [];      //当前坐标
        this.rotato = 0;               //玩家角度
        this.target_position = []       //目标坐标
        this.speed = 0;               //未知字段4
    }

    parse(data) {
        this.current_postion = [data[1][0], data[1][1]];
        this.rotato = data[2];
        this.target_position = [data[3][0], data[3][1]]
        this.speed = data[4];

        global.web_content.send("local_player_position",this)
        return this;
    }
}

module.exports = player_postion_send;