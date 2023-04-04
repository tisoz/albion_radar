class Monster_normal_move_change {
    constructor() {
        // {"0":2231308,"1":2,"252":43}
        this.id = 0;        //物资ID
        this.position = 0;   //物品品质
    }

    parse(data) {

        this.id = data[0];        //物资ID
        // this.position = data[2];   //物品品质

        // console.log(JSON.stringify(this))
        // global.web_content.send("monster_load", this)

    }

}

module.exports = Monster_normal_move_change;