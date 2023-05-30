class New_monster_damage {
    constructor() {
        // {"0":2231308,"1":2,"252":43}
        this.id = 0;        //物资ID
    }

    parse(data) {

        this.id = data[0];        //物资ID
        this.hp = data[2]
        this.hp_max = data[3]
        // console.log(JSON.stringify(this))
        global.web_content.send("move_event", this)
    }

}

module.exports = New_monster_damage;