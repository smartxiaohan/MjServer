var Global = require("./Global.js");

function Player() {
	 
}
 
Player.prototype.reset = function() {
	this.uid = -1;
	this.username = "";
	this.chairno = -1;  

	this.handcards = [];
}

Player.prototype.dealCard = function(cardid) {
	this.handcards.push(cardid);
}


module.exports = Player;
