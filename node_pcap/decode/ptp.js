
function Ptp(emitter) {
    this.emitter = emitter;
    this.transportSpeific = undefined;
    this.messageType = undefined;
    this.version = undefined;
    this.length = undefined;
    this.domainNumber = undefined;
    this.flags = undefined;
    this.correction = undefined;
    this.sourcePortIdentity = undefined;
    this.sequenceId = undefined;
    this.control = undefined;
    this.logMessagePeriod = undefined;
    this.other = undefined;
    this.preciseOrigin = undefined;
}

//just use gptp protocol
Ptp.prototype.decode = function (raw_packet, offset) {

    this.transportSpeific = (raw_packet[offset] & 0xf0) >> 4;
    this.messageType = raw_packet[offset] & 0x0f;
    this.version = raw_packet[offset + 1] & 0x0f;

    this.length = raw_packet.readUInt16BE(offset + 2);

    this.domainNumber = raw_packet[offset + 4];
    this.flags = raw_packet.readUInt16BE(offset + 6);

    //TODO: map to time from buffer
    this.correction = Buffer.from(raw_packet.slice(offset + 8, offset + 16));
    this.sourcePortIdentity = Buffer.from(raw_packet.slice(offset + 20, offset + 30));
    this.sequenceId = raw_packet.readUInt16BE(offset + 30);
    this.control = raw_packet[offset + 32];
    this.logMessagePeriod = raw_packet[offset + 33];

    if (this.control === 2) {
        //follow up
        this.preciseOrigin = {
            seconds: ((raw_packet.readUInt16BE(offset + 34) * 0xffffffff) + raw_packet.readUInt32BE(offset + 36)),
            nanoseconds: raw_packet.readUInt32BE(offset + 40)
        };
        this.ohter = Buffer.from(raw_packet.slice(offset + 44));
    } else {
        this.other = Buffer.from(raw_packet.slice(offset + 34));
    }

    if (this.emitter) { this.emitter.emit("ptp", this); }
    return this;
};

Ptp.prototype.decoderName = "ptp";
Ptp.prototype.eventsOnDecode = true;

Ptp.prototype.toString = function () {
    var ret = "";

    switch (this.messageType) {
        case 0:
            ret += "Sync Message";
            break;
        case 0x2:
            ret += "Pdelay_Req Message";
            break;
        case 0x3:
            ret += "pdelay_Resp Message";
            break;
        case 0x8:
            ret += "Follow_Up Message";
            break;
        case 0xa:
            ret += "Pdelay_Resp_Follow_Up Message";
            break;
        case 0xb:
            ret += "Announce Message";
            break;
        case 0xc:
            ret += "Signaling Message";
            break;
        case 0xd:
            ret += "Management Message";
            break;
        default:
            ret += "Message type " + this.messageType;
    }
    ret += `(V${this.verions})`;
    return ret;
};

module.exports = Ptp;
