/**
 * author zdzDesigner on 2015.09.02
 */
'use strict'



var _ = require('underscore');
// //console.log(_);
var arr = ['a', 'b', 'c', 'd'];
var data = {
	name: 'zdz',
	age: 27,
	work: 'web'
};

// for(var i=0;i<arr.length;i++){
// 	//console.log(i);
// 	continue;

// }

// arr.forEach(function (val,index) {
// 	return; // 类似与for的 continue
// 	//console.log(val,index);
// });
// //console.log(arr.forEach);


setTimeout(function() {
	// each_arr();
	// each_data();
	// map();
	reduce();
	// find();
	// filter();
	// reject();
	// every();
	// some();
	// contains();
	invoke();
})

var each_arr = function() {
	/**
	 * _.each == _.forEach
	 * @1 'a' ,'b' ,'c' ...
	 * @2 0 ,1 ,2 ,....
	 * @3 ['a','b','c','d']
	 * @4 ['a','b','c','d']
	 *
	 * @5 无值 @4 undefined
	 * return 无效
	 */
	_.each(arr, function(val, index, list) {
		//console.log('val',val); 	// @1
		//console.log('index',index); // @2
		//console.log('list',list); 	// @3
		//console.log('this',this); 	// @4
		return;
		if (this.length <= 10) {
			this.push(val);
			//console.log(this);
		}
	}, arr); // @5
};


var each_data = function() {
	/**
	 * _.each == _.forEach
	 * @1 'zdz' ,'27' ,'web' ,....
	 * @2 'name' ,'age' ,'work' ...
	 * @3 { name: 'zdz', age: 27, work: 'web' }
	 * @4 ['a','b','c','d']
	 *
	 * @5 无值 @4 undefined
	 */
	_.each(data, function(val, index, list) {
		//console.log('val',val); 	// @1
		//console.log('index',index); // @2
		//console.log('list',list); 	// @3
		//console.log('this',this); 	// @4
	}, arr); // @5 无值 @4 undefined	
};

var map = function() {
	/**
	 * [返回新数组,返回的一定是数组哦！]
	 * @return {[type]}         [description]
	 */
	var new_arr = _.map({
		one: 1,
		two: 2,
		three: 3
	}, function(num, key) {
		// return num * 3; 
		// return 'aa'; //[ 'aa', 'aa', 'aa' ]
		//console.log(key);
		var a = {};
		a[key] = num;
		return a;
	});
	//console.log(new_arr); // [ { one: 1 }, { two: 2 }, { three: 3 } ]
};

// 归纳为
var reduce = function() {
	// var sum = _.reduce([1, 2, 3], function(memo, num){ 
	// 	//console.log('memo',memo);
	// 	if (num > 1) {
	// 		return memo + num; 
	// 	}else{
	// 		return memo;
	// 	}
	// }, 10);
	// //console.log(sum);

	var new_data = _.reduce({
		one: 1,
		two: 2,
		three: 3
	}, function(memo, key) {
		console.log(memo, key);
		// var data = val || {};
		// data[key]=val*2;
		return memo + key;
	});
	console.log(new_data);
}

// 返回匹配的第一个
var find = function() {
	/**
	 * _.find = _.detect
	 * [匹配第一个值， 并返回当前值]
	 * @param  {[type]} val     1, 3, 3, 4, 5, 6
	 * @param  {[type]} index   1, 2, 3, 4 ,...
	 * @param  {[type]} arr     [1, 3, 3, 4, 5, 6]
	 * @return {[type]}         [匹配的第一个值]
	 */
	var even = _.find([1, 3, 3, 4, 5, 6], function(val, index, list) {
		//console.log(list);
		//console.log(this);
		//console.log(index);
		if (val % 2 == 0) {
			return index;
		}
	}, arr);
	//console.log(even);
};

// 全运行返回匹配
var filter = function() {
	/**
	 * _.filter == _.select
	 * [description]
	 * @return {[type]} [description]
	 */
	var evens = _.filter([1, 2, 3, 4, 5, 6], function(val) {
		// if(val % 2 == 0){
		// 	return 'aa'; 
		// }

		if (val > 1) {
			return 'a';
		}

	});
	//console.log(evens); // [ 2, 3, 4, 5, 6 ]	
};

// 和filter相反
var reject = function() {
	var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) {
		return num % 2 == 0;
	});
	//console.log(odds);
};

// 全部运行 每一项都匹配 返回true
var every = function() {
	/**
	 * _.every == _.all
	 */
	var bool = _.every([true, 1, null, 'yes'], function(val) {
		// //console.log(val);
		return val !== 4;
	});
	//console.log(bool);
};

// 全部运行 有一项都匹配即 返回true
var some = function() {
	/**
	 * _.some == _.any
	 * @type {[type]}
	 */
	var bool = _.some([null, 0, 'yes', false]);
	//console.log(bool);
}

// 对象中是否包含当前值 使用 === (全等于)
var contains = function() {
	var bool = _.contains({
		name: 'zdz'
	}, 'zdz');
	//console.log(bool); // true
}


var invoke = function() {
		// var new_data = _.invoke([[5, 1, 7], [3, 2, 1]], 'sort'); // [ [ 1, 5, 7 ], [ 1, 2, 3 ] ]
		var new_data = _.invoke([
			[5, 1, 7],
			[3, 2, 1]
		], function(val, index) {
			//console.log(val);
			// //console.log(index);
		});
		// //console.log(new_data);
	}
	//console.log(); // true