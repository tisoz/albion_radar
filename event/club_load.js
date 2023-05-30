class Map_load {
    constructor() {
    }

    parse(data) {
        this.club = data[14] || ""
        global.web_content.send("club_load", this)

    }

}

module.exports = Map_load;