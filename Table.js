var Global = require("./Global.js");
var Player = require("./Player.js");

function Table() {
	this.reset();
}

Table.STATUS_FREE = 0; //空闲
Table.STATUS_HASONE_NO_PLAY = 1; //有人未开局
Table.STATUS_PLAY = 2; //开局

Table.TABLE_MAX_NUM = 4;

Table.prototype.reset = function() {
	this.tablenum = 0; //房间号，6位数
	this.host = -1;  //房主chairno
	this.status = Table.STATUS_FREE;

	this.players = [];
}

Table.prototype.getPlayersNum = function() {
	return this.players.length
}

Table.prototype.addPlayer = function(uid) {
	var player = new Player();
	player.uid = uid;
	player.chairno = this.players.length
	this.players.push(player);

	this.status = Table.STATUS_HASONE_NO_PLAY;
}


module.exports = Table;
