const pcap = require("npcap");
const PhotonParser = require('photon-packet-parser');
const event_list = require("./event/event_list")
const request_list = require("./event/request_list")
const {ipcMain} = require('electron')
const log = require('electron-log');

// 配置日志输出目标
log.transports.console.format = '{h}:{i}:{s} {text}';
log.transports.file.level = 'info';
log.transports.file.format = '{h}:{i}:{s} {text}';
log.transports.file.maxSize = 100 * 1024 * 1024;
log.transports.file.resolvePath = () => './log.log';
// 记录日志
log.info('init pacap model');
global.event_list = event_list;
global.manager = new PhotonParser();
ipcMain.on('login', (event, info) => {
    global.user = info;
    manager.setId(user['id'])
    try {
        pcap_session = pcap.createSession(info['dev_name'], {
            filter: filter,
            snap_length: 65535 * 32,
            buffer_timeout: 50,
            buffer_size: 256 * 1024 * 1024
        })
        pcap_session.on('packet', function (raw_packet) {
            // console.log(raw_packet)
            let packet = pcap.decode.packet(raw_packet)
            let data = packet.payload.payload.payload.data;
            // data = data.slice(10, data.length)
            manager.handle(data);
        });
        pcap_session.warningHandler = function (text) {
            log.info("waring " + text)
        }
    } catch (e) {
        console.log("npcap failed", e)
    }


});
var sourcePort = 5056;
var destinationPort = 5056;
var filter = "udp and (src port " + sourcePort + " or dst port " + destinationPort + ")";

for (let i of pcap.findalldevs()) {
    console.log("network", i.description)
    if (i.description === 'TAP-Windows Adapter V9') {
        var dev = i.name;
    }
}
//https://saas.daxue.dingtalk.com/dingtalk/resource/sign/add
BigInt.prototype.toJSON = function () {
    return this.toString();
}
global.manager.on('event', (packet) => {
    // 在这里处理接收到的结果
    // log.info("event | " + packet.code + " | " + JSON.stringify(packet.parameters))
    try {
        if (packet.code === 1 && packet.parameters) {
            // log.info("event | " + packet.code + " | " + JSON.stringify(packet.parameters))

            //进行事件处理
            let code = packet.parameters[252]
            if (event_list[code]) {
                (new event_list[code]).parse(packet.parameters)
            } else {
                // console.log(JSON.stringify(packet.parameters))
            }
        } else if (packet.code === 3) {
            (new event_list[packet.code]).parse(packet.parameters)
        }
    } catch (e) {
        console.log("error event ", e)
    }

});
global.manager.on('request', (packet) => {
    // 在这里处理接收到的结果
    // log.info("request | " + JSON.stringify(packet.parameters))
    if (packet.operationCode == 1 && packet.parameters) {
        //进行事件处理
        try {
            // log.info("request | " + JSON.stringify(packet.parameters))
            let code = packet.parameters[253]
            if (request_list[code]) {
                (new request_list[code]).parse(packet.parameters);
            }
        } catch (e) {
            console.log("error request", e)
        }
    }
});
global.manager.on('response', (packet) => {
    // 在这里处理接收到的结果
    // log.info("response | " + JSON.stringify(packet.parameters))

    if ((packet.operationCode === 1) && packet.parameters) {
        //进行事件处理
        try {
            let code = packet.parameters[253]
            if (request_list[code]) {
                (new request_list[code]).parse(packet.parameters);
            } else {
                console.log("response", packet)
            }
        } catch (e) {
            console.log("error response", e)
        }
    } else {
        console.log("response other", packet)

    }
});

global.manager.on("key_error", () => {
    fetch("http://8.218.34.95/api/get_key", {
        headers: {
            "token": user['token']
        }
    })
        .then(response => response.text())
        .then(key => manager.setKey(key))
})

