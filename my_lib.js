'use strict'

var str = {};
var obj = {};
var num = {};

//Construct an object based on prototype and array
obj.construct = function (_proto, _arr) {
	if (! Array.isArray(_arr)) {
		throw new TypeError("Argument must be an array");
	}
	var constr = _proto;
	var nullaryFunc = Function.prototype.bind.apply(constr, [null].concat(_arr));
	return new nullaryFunc();
}

//Get all of the property names through the prototype chain
obj.getAllPropertyNames = function (_obj) {
	var result = [];
	while (_obj) {
		result = result.concat(Object.getOwnPropertyNames(_obj));
		_obj = Object.getPrototypeOf(_obj);
	}
}

module.exports = {
	str: str,
	obj: obj,
	num: num
};