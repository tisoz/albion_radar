var Ptp = require("../../decode/ptp");
var events = require("events");
var shouldBehaveLikeADecoder = require("./decode").shouldBehaveLikeADecoder;
require("should");

describe("PTP", function(){
  beforeEach(function () {
    this.example = new Buffer("1802004c00000008000000000000000000000000223344fffe5566770001468e02fb0000000001893341a4970003001c0080c200000100000000000000000000000000000000000000000000", "hex");
    this.eventEmitter = new events.EventEmitter();
    this.instance = new Ptp(this.eventEmitter);
  });

  describe("#decode()", function(){
    shouldBehaveLikeADecoder("ptp", true);

    it("sets the #version to the PTP version", function() {
      this.instance.decode(this.example, 0);
      this.instance.should.have.property("version", 2);
    });

    it("sets the #messageType to the PTP messageType", function() {
      this.instance.decode(this.example, 0);
      this.instance.should.have.property("messageType", 8);
    });

    it("sets the #control to the PTP control", function() {
      this.instance.decode(this.example, 0);
      this.instance.should.have.property("control", 2);
    });
  });
});
