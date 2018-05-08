var Global = require("./Global.js");
var Table = require("./Table.js");
var Func = require("./Func.js");
var Calc = require("./Calc.js");

var Game = {};

Game.tables = {};

Game.init = function()
{
	if (!Array.prototype.shuffle) {
		Array.prototype.shuffle = function() {
			for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
			return this;
		};
	}

	if(!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(val) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] == val) return i;
			}
			return -1;
		};
	}

	if(!Array.prototype.remove) {
		Array.prototype.remove = function(val) {
			var index = this.indexOf(val);
			if (index > -1) {
				this.splice(index, 1);
			}
		};
	}
	

	for(var i=0; i<Global.TABLE_MAX_NUM; i++) 
	{
		Game.tables[i] = new Table();
		Game.tables[i].reset();
		//Game.tables[i].startGame(); //test code

		
	}	
	
	// var vecCardIDs = [1,10,19,2,11,20,3,12,21,4,13,22, 37,46];
	// var cardID = new Object;
	// cardID.value = 10;
 
	// var vecAction = [];
	// var huDetails = new Calc.HuDetails();
	// var wHuType = Global.HU_TYPE.MJ_HU_ZIMO;

	// Func.TestArr(vecCardIDs);
	// console.log(vecCardIDs);

	// Func.TestInt(cardID);
	// console.log(cardID);
	// for(var i=0; i<100; i++)
	// Game.tables[0].getCalc().CanHu(vecCardIDs, cardID, vecAction, huDetails, wHuType);

	// var j=0;

	//var test = Calc.IsValidFace(6);
};

Game.createTable = function(socket, tablenum, uid, username) 
{
	for(var i=0; i<Global.TABLE_MAX_NUM; i++) 
	{
		var table = this.tables[i];
		if(table.status == Table.STATUS_FREE)
		{
			table.tablenum = tablenum;
			table.host = uid;
			table.addPlayer(socket, uid, username);
			return table;
		}
	}
};

Game.onJoinFKTable = function(socket, tablenum, uid, username) {
	var table = Game.enterTable(socket, tablenum, uid, username);

	if(table != null) {
		var tabledata = table.buildTableData();
		var cmd_id = Global.CMD_ID.CMD_ID_JOIN_FKTABLE;
		table.broadcast(cmd_id, tabledata);
	}
}

Game.onReady = function(tablenum, uid) {
	var table = Game.findTableByNum(tablenum);
	if(table != null) {
		table.onPlayerReady(uid);
	}
}

Game.enterTable = function(socket, tablenum, uid, username) 
{
	//check if in one of the table
	for(var i=0; i<Global.TABLE_MAX_NUM; i++) 
	{
		var table = this.tables[i];
		if(table.tablenum == tablenum)
		{
			for(var j=0; j<table.players.length; j++) 
			{
				if(table.players[j] != null && table.players[j].uid == uid) 
				{
					table.players[j].socket = socket;
					return table;
				}
			}
		}
	}

	for(var i=0; i<Global.TABLE_MAX_NUM; i++) 
	{
		var table = this.tables[i];
		if(table.tablenum == tablenum 
			&& table.status ==Table.STATUS_HASONE_NO_PLAY
			&& table.getPlayersNum() < Table.TABLE_MAX_NUM)
		{
			table.addPlayer(socket, uid, username);
			return table;
		}
	}
	return null;
};

Game.findTableByNum = function(tablenum) {
	for(var i=0; i<Global.TABLE_MAX_NUM; i++) 
	{
		var table = this.tables[i];
		if(table.tablenum == tablenum)
		{
			return  table;
		}
	}
	return null;
}

Game.onOutCard = function(tablenum, chairno, cardid) {
	var table = Game.findTableByNum(tablenum);
	if(table != null) {
		table.onOutCard(chairno, cardid);
	}
}

Game.onCatchCard = function(tablenum,chairno) {
	var table = Game.findTableByNum(tablenum);
	if(table != null) {
		table.onCatchCard(chairno);
	}
}

Game.onGuoCard = function(tablenum,chairno) {
	var table = Game.findTableByNum(tablenum);
	if(table != null) {
		table.onGuoCard(chairno);
	}
}

module.exports = Game;
