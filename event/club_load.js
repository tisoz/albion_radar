class Map_load {
    constructor() {
    }

    parse(data) {
        this.club = data[14] || ""
        this.union = data[15] || ""
        global.web_content.send("club_load", this)

    }

}

module.exports = Map_load;