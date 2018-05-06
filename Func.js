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

Func.TestArr = function(arr) {
    for(var i=0; i<arr.length; i++) {
        arr[i] = arr[i] + 1;
    }
}

Func.TestInt = function(val) {
   val.value = val.value + 1;
}

module.exports = Func;
