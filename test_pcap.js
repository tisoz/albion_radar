const pcap = require("npcap");


var sourcePort = 443;
var destinationPort = 443;
var filter = "tcp and (src port " + sourcePort + " or dst port " + destinationPort + ")";

for (let i of pcap.findalldevs()) {
    console.log("network", i.description)
    if (i.description === 'Realtek PCIe 2.5GbE Family Controller') {
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

