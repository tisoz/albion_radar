class move_event {
    constructor() {
        // {"0":2231308,"1":2,"252":43}
        this.id = 0;        //物资ID
        this.position = 0;   //物品品质
    }

    parse(data) {

        this.id = data[0];        //物资ID
        this.position = [data[1].readFloatLE(9), data[1].readFloatLE(13)];   //物品品质
        // console.log(JSON.stringify(this))
        global.web_content.send("move_event", this)
    }

}

module.exports = move_event;