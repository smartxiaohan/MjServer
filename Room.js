var Global = require("./Global.js");

function Room() {
	this.reset();
}

Room.prototype.STATUS_FREE = 0; //空闲
Room.prototype.STATUS_HASONE_NO_PLAY = 0; //有人未开局
Room.prototype.STATUS_PLAY = 0; //开局

Room.prototype.reset = function() {
	this.roomnum = 0;
	this.status = Room.prototype.STATUS_FREE;
}


module.exports = Room;
