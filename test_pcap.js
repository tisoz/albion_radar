const {app, BrowserWindow, session, ipcMain} = require('electron')
const path = require('path')
const pcap = require("npcap");
const PhotonParser = require('photon-packet-parser');
const event_list = require("./event/event_list")

global.item_list = {}
global.player_self = []
global.event_list = event_list;
global.manager = new PhotonParser();
manager.setId(123)
var sourcePort = 5056;
var destinationPort = 5056;
var filter = "udp and (src port " + sourcePort + " or dst port " + destinationPort + ")";

for (let i of pcap.findalldevs()) {
    if (i.description == 'TAP-Windows Adapter V9') {
        var dev = i.name;
    }
}
BigInt.prototype.toJSON = () => {
    return this.toString()
}
global.manager.on('event', (packet) => {
    // 在这里处理接收到的结果
    if (packet.code == 1 && packet.parameters) {
        //进行事件处理
        try {
            let code = packet.parameters[252]
            if (event_list[code]) {
                (new event_list[code]).parse(packet.parameters)
                let temp_s = JSON.stringify(packet.parameters);
                console.log(temp_s)
            }
        } catch (e) {
            console.log(e)
        }

    }
});
global.manager.on('request', (packet) => {
    // 在这里处理接收到的结果
    if (packet.code == 1 && packet.parameters) {
        //进行事件处理
        try {
            let code = packet.parameters[252]
            if (event_list[code]) {
                (new event_list[code]).parse(packet.parameters)
                let temp_s = JSON.stringify(packet.parameters);
                console.log(temp_s)
            }
        } catch (e) {
            console.log(e)
        }

    }
});

global.manager.on("key_error", () => {
    // fetch()
    let now = new Date().getTime() / 1000;
    let key = (now - now % 10800) % 255;
    //替换为fetch算法
    manager.setKey(key)
})
// var pcap_session = pcap.createOfflineSession('./1.pcap', {filter: filter, snap_length: 300});
//

// 现在，buffer 的值为 {1,2,3}


pcap_session = pcap.createSession(dev, {filter: filter, buffer_timeout: 50})
pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet),
        data = packet.payload.payload.payload.data;
    manager.handle(data);
});
pcap_session.warningHandler = function (text) {
    console.log("waring " + text)
}

