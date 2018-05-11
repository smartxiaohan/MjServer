var Func = {};

Func.Log = function(str){
	 console.log(str);
};

Func.RandomTableNum = function() {
	return Math.floor(Math.random()*9000) + 1000;
};

//include min and max
Func.RandomBetween = function(min, max) {   
	return Math.floor(Math.random()*(max-min+1)+min);
};

//deep copy
Func.DeepCopy = function(obj){
    if(typeof obj != 'object'){
        return obj;
    }
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = Func.DeepCopy(obj[attr]);
    }
    return newobj;
}

Func.CopyArr = function(arr) {
    return arr.concat();
}

Func.GetCountOfValInArr = function(arr, val) {
    var processArr = arr.filter(function(value) {
        return value == val;
    })
    return processArr.length;
}

Func.IS_BIT_SET = function(flags, bit)  {
    if(bit == (bit & flags)) return true;
    return false;
}


module.exports = Func;
