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

	for(var i=0; i<Global.TABLE_MAX_NUM; i++) 
	{
		Game.tables[i] = new Table();
		Game.tables[i].reset();
		Game.tables[i].startGame(); //test code

		
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

Game.createTable = function(tablenum, uid, username) 
{
	for(var i=0; i<Global.TABLE_MAX_NUM; i++) 
	{
		var table = this.tables[i];
		if(table.status == Table.STATUS_FREE)
		{
			table.tablenum = tablenum;
			table.host = uid;
			table.addPlayer(uid, username);
			return table;
		}
	}
};

Game.enterTable = function(tablenum, uid, username) 
{
	for(var i=0; i<Global.TABLE_MAX_NUM; i++) 
	{
		var table = this.tables[i];
		if(table.tablenum == tablenum 
			&& table.status ==Table.STATUS_HASONE_NO_PLAY
			&& table.getPlayersNum() < Table.TABLE_MAX_NUM)
		{
			table.addPlayer(uid, username);
			return table;
		}
	}
	return null;
};

module.exports = Game;
