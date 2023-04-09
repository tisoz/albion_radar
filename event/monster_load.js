class Other_player_load {
    constructor() {
        // {"0":1484007,"1":1785,"2":255,"6":"","7":[160.50856018066406,-138.80320739746094],"8":[160.50856018066406,-138.80320739746094],"9":48194662,"10":246,"11":2.9000000953674316,"13":1135,"14":1135,"16":48123755,"17":182,"18":182,"19":5,"20":48194555,"28":0,"31":0,"252":117}
        this.id = 0;        //物资ID
        this.type = 0;      //怪物类型
        this.position = 0;  //玩家位置
        this.quality = 0;
        this.hp = 0;
        this.hp_max = 0;
    }

    parse(data) {
        this.id = data[0];        //物资ID
        this.type = data[1]
        this.position = data[8];  //玩家位置
        this.hp = data[13];
        this.hp_max = data[14];
        this.quality = data[31] || 0;
        this.obj = data;
        // console.log(JSON.stringify(data))
        global.web_content.send("monster_load", this)
    }

}

module.exports = Other_player_load;