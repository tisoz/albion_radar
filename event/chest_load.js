class dungeon {
    constructor() {
        // {"0":73,"1":[-78.5,157.5],"2":328,"3":"KEEPER_SOLO_CHEST_UNCOMMON","4":"FOREST_GREEN_LOOTCHEST_KEEPER_SOLO_UNCOMMON","5":2,"7":[],"8":[],"13":true,"14":"KEEPER_SOLO_LOOTCHEST_UNCOMMON","252":377}
        this.id = 0;        //物资ID
        this.type = 0;      //怪物类型
        this.position = 0;  //玩家位置
        this.name = ""
        this.quality = 0;
    }

    parse(data) {
        this.id = data[0];        //物资ID
        this.type = data[2]      //1洞穴 , 2团队地下城
        this.position = data[1];  //玩家位置
        this.name = data[3]
        this.quality = data[5] || 0;
        this.obj = data;
        // console.log(JSON.stringify(data))
        global.web_content.send("chest_load", this)
    }

}

module.exports = dungeon;