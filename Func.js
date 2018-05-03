var Func = {};

Func.Log = function(str){
	 console.log(str);
};

Func.RandomTableNum = function() {
	var ran = Math.random();
	return Math.floor(ran*10000+1);
};

module.exports = Func;
