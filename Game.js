var Global = require("./Global.js");

var Game = {};

Game.tables = {};

Game.init = function(){
	for(var i=0; i<Global.ROOM_NUM; i++) {
		Game.tables[i] = {};
	}
};

module.exports = Game;
