class Map_load {
    constructor() {
        // {"0":2231308,"1":2,"252":43}
        this.id = 0;        //物资ID
    }

    parse(data) {

        this.id = data[0];        //物资ID
        // console.log(JSON.stringify(this))
        global.web_content.send("map_load", this)

    }

}

module.exports = Map_load;