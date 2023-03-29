const PhotonPacket = require('./PhotonPacket');
const EventEmitter = require('events');

class PhotonPacketParser extends EventEmitter {
	constructor(id) {
		super();
	}

	setId(id){
		this.id = id;
	}
	setKey(key){
		this.key = key;
	}
	handle(buff) {
		this.emit('packet', new PhotonPacket(this, buff));
	}
}

module.exports = PhotonPacketParser;