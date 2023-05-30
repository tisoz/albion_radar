class Map_load {
    constructor() {
        this.friend_list = []
    }

    parse(data) {
        // 23:31:31 event | 1 | {"0":50483,"2":1,"3":{"type":"Buffer","data":[216,146,251,74,150,235,161,67,163,57,205,59,209,174,131,228]},"4":[{"type":"Buffer","data":[216,146,251,74,150,235,161,67,163,57,205,59,209,174,131,228]},{"type":"Buffer","data":[95,3,114,155,197,209,207,74,160,38,66,156,91,48,38,126]}],"5":["gooutp","ohlame"],"6":{"type":"Buffer","data":[0,0]},"7":{"type":"Buffer","data":[0,0]},"8":{"type":"Buffer","data":[0,0]},"9":[65535,65535],"10":[65535,5],"11":[true,true],"252":220}
        this.friend_list = data[5] || []
        global.web_content.send("friend_load", this)

    }

}

module.exports = Map_load;