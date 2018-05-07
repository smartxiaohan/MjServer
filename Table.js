var Global = require("./Global.js");
var Player = require("./Player.js");
var Func = require("./Func.js");
var Calc = require("./Calc.js");
var Config = require("./Config.js");

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
	this.curPlayer = null;
	this.m_dwStatus = 0;

	this.players = [];
	this.cardids = [];
	this.initCards();

	this.jokerFace1 = Global.INVALID_FACE;
	this.jokerFace2 = Global.INVALID_FACE;

	this.calc = new Calc();
	this.calc.setJoker1(this.jokerFace1);
	this.calc.setJoker2(this.jokerFace2);
}

Table.prototype.setStatusWhenStart = function()
{
	m_dwStatus = Global.WAITING_STATUS.TS_PLAYING;
	m_dwStatus |= Global.WAITING_STATUS.TS_WAITING_OUT;
}

Table.prototype.setStatusAfterCatch = function()
{
	m_dwStatus &= ~Global.WAITING_STATUS.TS_WAITING_CATCH;
	m_dwStatus |= Global.WAITING_STATUS.TS_WAITING_OUT;
}

Table.prototype.setStatusAfterPeng = function()
{
	m_dwStatus &= ~Global.WAITING_STATUS.TS_WAITING_CATCH;
	m_dwStatus |= Global.WAITING_STATUS.TS_WAITING_OUT;
}

Table.prototype.setStatusAfterGang = function()
{
	m_dwStatus &= ~Global.WAITING_STATUS.TS_WAITING_CATCH;
	m_dwStatus |= Global.WAITING_STATUS.TS_WAITING_OUT;
}

Table.prototype.setStatusAfterOut = function()
{
	m_dwStatus &= ~Global.WAITING_STATUS.TS_WAITING_OUT;
	m_dwStatus |= Global.WAITING_STATUS.TS_WAITING_CATCH;
}

Table.prototype.setStatusAfterChi = function()
{
	m_dwStatus &= ~Global.WAITING_STATUS.TS_WAITING_CATCH;
	m_dwStatus |= Global.WAITING_STATUS.TS_WAITING_OUT;
}

Table.prototype.setCurrentPlayer = function(player) {
	this.curPlayer = player;
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

Table.prototype.getPlayerByUid = function(uid) {
	for(var i=0; i<this.players.length; i++) {
		var player = this.players[i];
		if(player && player.uid == uid) {
			return player;
		}
	}
	return null;
}

// 获取前一个玩家
Table.prototype.getPrePlayer = function(player)
{
	if(player == null) return null;

	var prePlayerChairno = (player.chairno - 1 + 4) % 4;;
	
	for(var i=0; i<this.players.length; i++) {
		var p = this.players[i];
		if(p != null && p.chairno == prePlayerChairno) {
			return p;
		}
	}

	return null;
}

// 获取下一个玩家
Table.prototype.getNextPlayer= function(player)
{
	if(player == null) return null;

	var nextPlayerChairno = (player.chairno + 1) % 4;;
	
	for(var i=0; i<this.players.length; i++) {
		var p = this.players[i];
		if(p != null && p.chairno == nextPlayerChairno) {
			return p;
		}
	}

	return null;
}

Table.prototype.broadcast = function(cmd_id, jsondata) {
	for(var i=0; i<this.players.length; i++) {
		var player = this.players[i];
		if(player && player.socket) {
			var tablestr = JSON.stringify(jsondata);
			var backdata = {"cmd_id":cmd_id, "data": tablestr};
			player.socket.sendText(JSON.stringify(backdata));
		}
	}	
}

Table.prototype.addPlayer = function(socket, uid,username) {
	for(var i=0; i<this.players.length; i++) {
		var player = this.players[i];
		if(player.uid == uid) {
			return;
		}
	}

	var player = new Player();
	player.reset();
	player.socket = socket;
	player.table = this;
	player.uid = uid;
	player.username = username;
	player.chairno = this.players.length
	this.players.push(player);

	this.status = Table.STATUS_HASONE_NO_PLAY;
}

//build data send to client, all table data
Table.prototype.buildTableData = function() {
	var tabledata = {};

	tabledata.tablenum = this.tablenum;  
	tabledata.host = this.host;   
	tabledata.banker = this.banker;   
	tabledata.status = this.status;

	tabledata.players = [];

	for(var i=0; i<this.players.length; i++) {
		var playerdata = new Player();
		var player = this.players[i];

		playerdata.uid = player.uid;
		playerdata.username = player.username;
		playerdata.chairno = player.chairno;  

		playerdata.handcards = Func.CopyArr(player.handcards);
		tabledata.players.push(playerdata);
	}
 
	return tabledata;
}

Table.prototype.buildOutData = function(player, cardid,catchCardid) {
	var data = {};
	data.cardid = cardid;
	data.catchCardid = catchCardid;

	if(player) {
		data.chairno = player.chairno;
	}

	if(catchCardid != Global.INVALID_CARDID && this.curPlayer != null) {
		data.catchCardChairNO = this.curPlayer.chairno;
	}
	
	return data;
}

Table.prototype.MoveToNextPlayer = function()
{ 
	this.curPlayer = this.getNextPlayer(this.curPlayer); 
 
	return this.curPlayer; 
}

Table.prototype.onPlayerReady = function(uid) {
	var player = this.getPlayerByUid(uid);

	if(player == null) {
		return false;
	}

	player.ready = true;
	var data = {};
	data.chairno = player.chairno;
	this.broadcast(Global.CMD_ID.CMD_ID_READY, data);
}

Table.prototype.onOutCard = function(uid, cardid) {
	var player = this.getPlayerByUid(uid);

	if(player == null) {
		return false;
	}

	if(self.curPlayer == null) {
		return false;
	} 
	
	if(self.curPlayer.isMySelf(player) == false) {
		return false;
	}

	if(player.canOutCard(cardid) == false) {
		return false;
	}

	player.doOutCard(cardid);

	var allguo = false;
	for(var i=0; i<this.players.length; i++) {
		var tempPlayer = this.players[i];
		if(tempPlayer == null) continue;

		tempPlayer.resetPGCHFlags();

		if(tempPlayer.isMySelf(player)) {
			player.setGuoState(true);
			continue;
		}

		var dwPGCHFlag = 0;
		if (Config.CanPeng) dwPGCHFlag |= Global.ACT_TYPE.ACT_PENG;
		if (Config.CanMnGang) dwPGCHFlag |= Global.ACT_TYPE.ACT_MINGGANG;
		if (Config.CanAnGang) dwPGCHFlag |= Global.ACT_TYPE.ACT_ANGANG;
		if (Config.CanPnGang) dwPGCHFlag |= Global.ACT_TYPE.ACT_BUGANG;
		if (Config.CanFangChong) dwPGCHFlag |= Global.ACT_TYPE.ACT_HU;
		if (player.IsMyNext(tempPlayer))
		{
			if (Config.CanChi)
				dwPGCHFlag |= Global.ACT_TYPE.ACT_CHI;
		}

		if(tempPlayer.calcPGCH(player, cardid, dwPGCHFlag)) {
			allguo = false;
			tempPlayer.setGuoState(false);
		}
		else {
			tempPlayer.setGuoState(true);
		}
	}

	this.setStatusAfterOut();
	this.moveToNextPlayer();

	var catchCardid = Global.INVALID_CARDID;
	if(allguo == true) {
		//begin catch card for next player
		catchCardid = this.cartchOneCard(this.curPlayer);
		if(catchCardid == Global.INVALID_CARDID) {
			//game end
			return;
		}
	}

	this.notifyOutCard(player, cardID, catchCardid);
}

Table.prototype.notifyOutCard = function(player, cardid) {
	var outdata = this.buildOutData(player, cardid, catchCardid);
	this.broadcast(Global.CMD_ID.CMD_ID_OUTCARD, outdata);
}

module.exports = Table;
