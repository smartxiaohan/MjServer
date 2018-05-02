var Global = require("./Global.js");
var Room = require("./Room.js");

var Game = {};

Game.rooms = {};

Game.init = function()
{
	for(var i=0; i<Global.ROOM_MAX_NUM; i++) 
	{
		Game.rooms[i] = new Room();
	}
};

Game.createRoom = function(roomnum) 
{
	for(var i=0; i<Global.ROOM_MAX_NUM; i++) 
	{
		var room = this.rooms[i];
		if(room.status == Room.prototype.STATUS_FREE)
		{
			room.roomnum = roomnum;
			return room;
		}
	}
};

module.exports = Game;
