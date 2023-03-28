const pcap = require("npcap");
const PhotonParser = require('photon-packet-parser');

global.manager = new PhotonParser();
var sourcePort = 5056;
var destinationPort = 5056;
var filter = "udp and (src port " + sourcePort + " or dst port " + destinationPort + ")";

for (let i of pcap.findalldevs()) {
    if (i.description.indexOf("Realtek") + 1) {
        var dev = i.name;
    }
    console.log(i.description)
}
global.manager.on('packet', (packet) => {
    // 在这里处理接收到的结果
    console.log(packet);
});

pcap_session = pcap.createSession(dev, {filter: filter, buffer_timeout: 0})
pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet),
        data = packet.payload.payload.payload.data;

    console.log(packet.link_type);
    manager.handle(data)
});
