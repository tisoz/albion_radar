class Map_change {
    constructor() {
        // {"0":2388,"1":"638405792844635891","2":"@MISTS@4549571d-88f4-45a2-857c-0bdce7765c84","3":true,"4":"5001","5":"638405804413820947","252":504}
        this.id = 0;        //物资ID
    }

    parse(data) {

        this.id = data[2];        //物资ID
        this.type = ""
        console.log("map", JSON.stringify(this))
        if (data['252'] === 518) this.id = 0
        global.web_content.send("map_load", this)

    }

}

module.exports = Map_change;