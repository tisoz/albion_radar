class Map_load {
    constructor() {
        this.friend_list = []
    }

    parse(data) {
        // 23:31:31 event | 1 | {"0":"ohlame","1":true,"3":5,"252":229}
        this.friend_list = [data[0]] || []
        global.web_content.send("friend_load", this)

    }

}

module.exports = Map_load;