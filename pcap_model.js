const pcap = require("npcap");
const PhotonParser = require('photon-packet-parser');
const event_list = require("./event/event_list")
const request_list = require("./event/request_list")
const {ipcMain} = require('electron')

global.event_list = event_list;
global.manager = new PhotonParser();
ipcMain.on('login', (event, info) => {
    global.user = info;
    manager.setId(user['id'])
    pcap_session = pcap.createSession(info['dev_name'], {filter: filter, buffer_timeout: 50})
    pcap_session.on('packet', function (raw_packet) {
        var packet = pcap.decode.packet(raw_packet),
            data = packet.payload.payload.payload.data;
        manager.handle(data);
    });
    pcap_session.warningHandler = function (text) {
        console.log("waring " + text)
    }
});
var sourcePort = 5056;
var destinationPort = 5056;
var filter = "udp and (src port " + sourcePort + " or dst port " + destinationPort + ")";

for (let i of pcap.findalldevs()) {
    console.log("network", i.description)
    if (i.description == 'TAP-Windows Adapter V9') {
        var dev = i.name;
    }
}
//https://saas.daxue.dingtalk.com/dingtalk/resource/sign/add
BigInt.prototype.toJSON = function () {
    return this.toString();
}
global.manager.on('event', (packet) => {
    // 在这里处理接收到的结果
    if (packet.code == 1 && packet.parameters) {
        // console.log(JSON.stringify(packet.parameters))
        //进行事件处理
        try {
            let code = packet.parameters[252]
            if (event_list[code]) {
                (new event_list[code]).parse(packet.parameters)
            } else {
                console.log(JSON.stringify(packet.parameters))
            }
        } catch (e) {
            // console.log(e)
        }

    } else if (packet.code == 3) {
        (new event_list[packet.code]).parse(packet.parameters)
        // console.log(JSON.stringify([packet.parameters[0],[packet.parameters[1].readFloatLE(9),packet.parameters[1].readFloatLE(13)]]))
        // console.log(packet.parameters)
    }
});
global.manager.on('request', (packet) => {
    // 在这里处理接收到的结果
    if (packet.operationCode == 1 && packet.parameters) {
        //进行事件处理
        try {
            let code = packet.parameters[253]
            if (request_list[code]) {
                (new request_list[code]).parse(packet.parameters);
            }
        } catch (e) {
            console.log(e)
        }
    }
});
global.manager.on('response', (packet) => {
    // 在这里处理接收到的结果
    if (packet.operationCode == 1 && packet.parameters) {
        //进行事件处理
        try {
            let code = packet.parameters[253]
            if (request_list[code]) {
                (new request_list[code]).parse(packet.parameters);
            }
        } catch (e) {
            console.log(e)
        }
    }
});

global.manager.on("key_error", () => {
    fetch("http://game.tisoz.com/api/get_key", {
        headers: {
            "token": user['token']
        }
    })
        .then(response => response.text())
        .then(key => manager.setKey(key))
})

