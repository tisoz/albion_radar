class Cage_load {
    constructor() {
        // {"0":1484007,"1":1785,"2":255,"6":"","7":[160.50856018066406,-138.80320739746094],"8":[160.50856018066406,-138.80320739746094],"9":48194662,"10":246,"11":2.9000000953674316,"13":1135,"14":1135,"16":48123755,"17":182,"18":182,"19":5,"20":48194555,"28":0,"31":0,"252":117}
        this.id = 0;        //物资ID
        this.position = 0;  //玩家位置
        this.name = ""
    }

    parse(data) {
        this.id = data[0];        //物资ID
        this.position = data[1];  //玩家位置
        this.name = data[3]
        this.obj = data;
        // {"0":1173,"1":[99.5,-231.5],"3":"SHARED_FILL_CAGE_WISP_HERETICS_A","252":509}
        console.log(JSON.stringify(data))
        global.web_content.send("cage_load", this)
    }

}

module.exports = Cage_load;