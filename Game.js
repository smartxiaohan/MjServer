var Global = require("./Global.js");
var Table = require("./Table.js");

var Game = {};

Game.tables = {};

Game.init = function()
{
	for(var i=0; i<Global.TABLE_MAX_NUM; i++) 
	{
		Game.tables[i] = new Table();
	}
};

Game.createTable = function(tablenum, uid) 
{
	for(var i=0; i<Global.TABLE_MAX_NUM; i++) 
	{
		var table = this.tables[i];
		if(table.status == Table.STATUS_FREE)
		{
			table.tablenum = tablenum;
			table.host = uid;
			table.addPlayer(uid);
			return table;
		}
	}
};

Game.enterTable = function(tablenum, uid) 
{
	for(var i=0; i<Global.TABLE_MAX_NUM; i++) 
	{
		var table = this.tables[i];
		if(table.tablenum == tablenum 
			&& table.status ==Table.STATUS_HASONE_NO_PLAY
			&& table.getPlayersNum() < Table.TABLE_MAX_NUM)
		{
			table.addPlayer(uid);
			return table;
		}
	}
	return null;
};

module.exports = Game;
