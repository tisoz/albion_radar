function IEEE1722(emitter) {
    this.emitter = emitter;
    this.subtype = undefined;
    this.version = undefined;
    this.sequenceNum = undefined;
    this.streamId = undefined;
    this.ts = undefined;
    this.format = undefined;
    this.nsr = undefined;
    this.channl = undefined;
    this.bit = undefined;
    this.length = undefined;
    this.data = undefined;
}

//just use audio pcm protocol
IEEE1722.prototype.decode = function (raw_packet, offset) {
    this.subtype = raw_packet[offset];
    this.version = ((raw_packet[offset + 1] & 0x70) >> 4);
    this.sequenceNum = raw_packet[offset + 2];
    this.streamId = Buffer.from(raw_packet.slice(offset + 4, offset + 12));
    this.ts = raw_packet.readUInt32BE(offset + 12);
    this.format = raw_packet[offset + 16];
    this.nsr = ((raw_packet[offset + 17] & 0xe0) >> 5);
    this.channl = (raw_packet[offset + 17] & 0x3) + raw_packet[offset + 18];
    this.bit = raw_packet[offset + 19];
    this.length = raw_packet.readUInt16BE(offset + 20);
    this.data = Buffer.from(raw_packet.slice(offset + 24));
    
    if (this.emitter) { this.emitter.emit("ieee1722", this); }
    
    return this;
};

IEEE1722.prototype.decoderName = "ieee1722";
IEEE1722.prototype.eventsOnDecode = true;

IEEE1722.prototype.toString = function () {
    var ret = "";

    switch (this.nsr) {
        case 0:
            ret += "User Specified Freq";
            break;
        case 1: 
            ret += "8KHz";
            break;
        case 2:
            ret += "16KHz";
            break;
        case 3:
            ret += "32KHz";
            break;
        case 4:
            ret +="44.1KHz";
            break;
        case 5:
            ret +="48KHz";
            break;
        case 6:
            ret += "88.2KHz";
            break;
        case 7:
            ret += "96KHz";
            break;
        case 8:
            ret += "176.4KHz";
            break;
        case 9:
            ret += "192KHz";
            break;
        case 10:
            ret += "24KHz";
            break;
        default:
            ret += "NSR: " + this.nsr;
    }
    ret += `Bit Depth:${this.bit} Channels Per Frame:${this.channel}`;
    return ret;
};

module.exports = IEEE1722;
