var Global = require("./Global.js");

function Player() {
	this.reset();
}
 
Player.prototype.reset = function() {
	this.uid = -1;
	this.chairno = -1;  
}


module.exports = Player;
