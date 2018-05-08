var Global = require("./Global.js");
var Func = require("./Func.js");

function Player() {
	 
}
 
Player.prototype.reset = function() {
	this.uid = -1;
	this.username = "";
	this.chairno = -1;  
	this.socket = null;
	this.table = null;

	this.ready = false;

	this.dwPGCHFlags = Global.ACT_TYPE.ACT_NULL;
	this.pass = false;

	this.handcards = [];
	this.outcards = [];
}

Player.prototype.getPGCHFlags = function() { return dwPGCHFlags; }
Player.prototype.resetPGCHFlags = function() { dwPGCHFlags = Global.ACT_TYPE.ACT_NULL; }

Player.prototype.getGuoState = function(){ return this.pass; }
Player.prototype.setGuoState = function(bPass){ this.pass = bPass; }

Player.prototype.setCurrentAction = function(act) { m_CurrentAction = act; }
Player.prototype.getCurrentAction = function(){ return m_CurrentAction; }
Player.prototype.resetCurrentAction = function() { m_CurrentAction.reset(); }

Player.prototype.dealCard = function(cardid) {
	this.handcards.push(cardid);
}

Player.prototype.isMySelf = function(player) {
	if(player && player.uid == this.uid) return true;
	return false;
}

Player.prototype.isMyNext = function(player) {
	if(player) {
		if((player.chairno + 1)%4 == this.chairno) {
			return true;
		}
	}  
	return false;
}

Player.prototype.isMyPre = function(player)
{
	if(player) {
		if((player.chairno - 1)%4 == this.chairno) {
			return true;
		}
	}  
	return false;
}
 
Player.prototype.canOutCard = function(cardid) {
	for(var i=0; i<this.handcards.length; i++) {
		if(this.handcards[i] == cardid) {
			return true;
		}
	}
	return false;
}

Player.prototype.doOutCard = function(cardid) {
	this.delHandCard(cardID);
	this.addOutCard(cardID);
}

Player.prototype.doCatchCard(cardid, fromTail)
{
	this.addHandCard(cardID);
	//this.canHuZiMo(cardID);
}

Player.prototype.doGuo = function() {
	if (false == m_bPass)
	{
		m_bPass = true;
	} 
}

Player.prototype.delHandCard = function(cardid) {
	this.handcards.remove(cardid);
}

Player.prototype.addHandCard = function(cardid) {
	this.handcards.push(cardid);
}

Player.prototype.addOutCard = function(cardid) {
	this.outcards.push(cardid);
}

Player.prototype.calcPGCH = function(player, cardid, dwPgchFlag) {
	var dwRet = 0;

	if(Func.IS_BIT_SET(dwPgchFlag, Global.ACT_TYPE.ACT_CHI)) {
		if(this.canChiCard(player, cardid)) {
			dwRet = dwRet | Global.ACT_TYPE.ACT_CHI;
		}
	}

	if(Func.IS_BIT_SET(dwPgchFlag, Global.ACT_TYPE.ACT_PENG)) {
		if(this.canPengCard(player, cardid)) {
			dwRet = dwRet | Global.ACT_TYPE.ACT_PENG;
		}
	}

	if(Func.IS_BIT_SET(dwPgchFlag, Global.ACT_TYPE.ACT_MINGGANG)) {
		if(this.canMnGangCard(player, cardid)) {
			dwRet = dwRet | Global.ACT_TYPE.ACT_MINGGANG;
		}
	}

	if(dwRet > 0) {
		dwRet = dwRet | Global.ACT_TYPE.ACT_GUO;
	}

	this.dwPGCHFlags = dwRet;
}


module.exports = Player;
