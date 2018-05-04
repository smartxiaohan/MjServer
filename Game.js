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

	var test = Calc.IsValidFace(6);
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
