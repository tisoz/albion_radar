class monster_quality_change {
    constructor() {
        // {"0":2231308,"1":2,"252":43}
        this.id = 0;        //物资ID
        this.quality = 0;   //物品品质
    }

    parse(data) {

        this.id = data[0];        //物资ID
        this.quality = data[1];   //物品品质

        // console.log(JSON.stringify(this))
        global.web_content.send("monster_load", this)

    }

}

module.exports = monster_quality_change;