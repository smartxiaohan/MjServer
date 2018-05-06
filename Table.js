var Global = require("./Global.js");
var Player = require("./Player.js");
var Func = require("./Func.js");
var Calc = require("./Calc.js");

function Table() {
}

Table.STATUS_FREE = 0; //空闲
Table.STATUS_HASONE_NO_PLAY = 1; //有人未开局
Table.STATUS_PLAY = 2; //开局

Table.TABLE_MAX_NUM = 4;
Table.TABLE_MAX_DEAL_NUM = 13;

Table.prototype.reset = function() {
	this.tablenum = 0; //房间号，4位数
	this.host = -1;  //房主chairno
	this.banker = -1;  //庄家chairno
	this.status = Table.STATUS_FREE;

	this.players = [];
	this.cardids = [];
	this.initCards();

	this.jokerFace1 = Global.INVALID_FACE;
	this.jokerFace2 = Global.INVALID_FACE;

	this.calc = new Calc();
	this.calc.setJoker1(this.jokerFace1);
	this.calc.setJoker2(this.jokerFace2);
}

Table.prototype.getCalc = function() {
	return this.calc;
}
 

Table.prototype.getJoker1 = function() {
	return this.jokerFace1;
}

Table.prototype.getJoker2 = function() {
	return this.jokerFace2;
}

Table.prototype.initCards = function() {
	for(var i=1; i<=136; i++) {
		this.cardids.push(i);
	}
}

Table.prototype.shuffleCards = function() {
	this.cardids.shuffle();
}

Table.prototype.startGame = function() {
	this.addPlayer("333", "333");
	this.addPlayer("444", "444");
	this.addPlayer("222", "222");
	this.addPlayer("111", "111");

	this.shuffleCards();
	this.calcBankerBeforeGame();
	this.dealCards();

	 
}

Table.prototype.dealCards =  function() {
	for(var i=0; i<this.getPlayersNum(); i++) {
		var player = this.players[i];
		var dealnum = Table.TABLE_MAX_DEAL_NUM;
		if(player.chairno == this.banker) {
			dealnum = dealnum + 1;
		}

		for(var j=0; j<dealnum; j++) {
			var cardid = this.cardids.shift();
			player.dealCard(cardid);
		}
	}	
}

Table.prototype.calcBankerBeforeGame = function() {
	this.banker = Func.RandomBetween(0, Table.TABLE_MAX_NUM-1);
}

Table.prototype.getPlayersNum = function() {
	return this.players.length
}

Table.prototype.addPlayer = function(uid,username) {
	for(var i=0; i<this.players.length; i++) {
		var player = this.players[i];
		if(player.uid == uid) {
			return;
		}
	}

	var player = new Player();
	player.reset();
	player.uid = uid;
	player.username = username;
	player.chairno = this.players.length
	this.players.push(player);

	this.status = Table.STATUS_HASONE_NO_PLAY;
}


module.exports = Table;
