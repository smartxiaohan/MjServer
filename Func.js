var Func = {};

Func.Log = function(str){
	 console.log(str);
};

Func.RandomRoomNum = function() {
	var ran = Math.random();
	return Math.floor(ran*1000000+1);
};

module.exports = Func;
