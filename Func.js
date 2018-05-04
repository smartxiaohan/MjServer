var Func = {};

Func.Log = function(str){
	 console.log(str);
};

Func.RandomTableNum = function() {
	var ran = Math.random();
	return Math.floor(ran*10000+1);
};

//include min and max
Func.RandomBetween = function(min, max) {   
	return Math.floor(Math.random()*(max-min+1)+min);
};

module.exports = Func;
