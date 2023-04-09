const pcap = require("npcap");


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
pcap_session = pcap.createSession(dev, {filter: filter, buffer_timeout: 50})
pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet),
        data = packet.payload.payload.payload.data;
    console.log(data)
});
pcap_session.warningHandler = function (text) {
    console.log("waring " + text)
}

