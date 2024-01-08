class dungeon {
    constructor() {
        // {"0":100954,"1":[150,-80],"3":"HIGHLAND_RED_RANDOM_EXIT_10x10_PORTAL_SOLO_B","4":true,"5":0,"7":true,"11":0,"13":65535,"14":1,"16":0,"252":308}
        this.id = 0;        //物资ID
        this.type = 0;      //怪物类型
        this.position = 0;  //玩家位置
        this.name = ""
        this.quality = 0;
    }

    parse(data) {
        this.id = data[0];        //物资ID
        this.type = data[14]      //1洞穴 , 2团队地下城
        this.position = data[1];  //玩家位置
        this.name = data[3]
        this.quality = data[6] || 0;
        this.obj = data;
        // console.log(JSON.stringify(data))
        global.web_content.send("dungeon_load", this)

        if (data[7] === true) {
            global.web_content.send("map_load", {id: this.name})
        }
    }

}

module.exports = dungeon;