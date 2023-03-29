var pcap = require("../pcap")

pcap_session = pcap.createSession("\\Device\\NPF_{C1083531-8979-402C-BA4B-1142E862E5D9}",{buffer_size:256*1024*1024})

console.log("Listening on " + pcap_session.device_name);

var streamId = Buffer.from('91e0f000fe810001','hex');
var sequenceNum;
var first = true;
pcap_session.on('packet', function (raw_packet) {

    var packet = pcap.decode.packet(raw_packet)
    // data = packet.payload.data;
    if(Buffer.compare(packet.payload.payload.streamId,streamId)==0){
        // console.log(packet.payload.payload.sequenceNum);
        if(first){
            sequenceNum=(packet.payload.payload.sequenceNum+1)&0xff;
            first=false;
        }else{

            if(sequenceNum!=packet.payload.payload.sequenceNum){
                console.error(`error,${sequenceNum},${packet.payload.payload.sequenceNum}`)
                
            }else{
                sequenceNum=(sequenceNum+1)&0xff;
            }
        }
    }
    
    // console.log(data.toString('hex'));
});
