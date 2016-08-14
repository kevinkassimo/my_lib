'use strict';

var str = {};

var obj;
obj = {
	active: {
		get: function () {
			return this.__active__;
		},
		set: function (_b_new_objl) {
			this.__active__ = _b_new_objl;
		}
	},
	__active__: true
};
var num = {};


//Construct an object from prototype
obj.create = function(_proto, _props) {
	return Object.create(_proto, _props);
};

//Construct an object based on prototype and array
obj.createFromArray = function (_proto, _arr) {
	if (! Array.isArray(_arr)) {
		throw new TypeError("Argument must be an array");
	}
	var newConstructor = Function.prototype.bind.apply(_proto, [null].concat(_arr));
	return new newConstructor();
};

//Copy an object as a new object
obj.copy = function (_orig) {
	var cp = Object.create(Object.getPrototypeOf(_orig));
	obj.copyOwnProperties(cp, _orig);
	return cp;
};

//Copy own properties of the object from source to target
obj.copyOwnProperties = function(_target, _source) {
	Object.getOwnPropertyNames(_source)
		.forEach(function (propKey) {
			var desc = Object.getOwnPropertyDescriptor(_source, propKey);
			Object.defineProperty(_target, propKey, desc);
		});
	return _target;
};

//Get all of the property names through the prototype chain
obj.getPropertyNames = function (_obj) {
	var result = [];
	while (_obj) {
		result = result.concat(Object.getOwnPropertyNames(_obj));
		_obj = Object.getPrototypeOf(_obj);
	}
};

//Get own property names
obj.getOwnPropertyNames = function (_obj) {
	//Wrapper
	return Object.getOwnPropertyNames(_obj);
};

//Check if the given property name exists in the prototype chain
obj.hasProperty = function (_obj, _propName) {
	var allProp = obj.getAllPropertyNames(_obj);
	for (var name in allProp) {
		if (_propName == name) {
			return true;
		}
	}
	return false;
};

//Check if the given property name exists in the obj itself (not following the prototype chain)
obj.hasOwnProperty = function (_obj, _propName) {
	//Use the built-in method. This function only serves as a wrapper so that the library would be complete
	return {}.hasOwnProperty.call(_obj, _propName);
};

//Compress multilayer object into one layer (the top of the prototype chain will rewrite properties of those below)
obj.compress = function (_obj) {
	var newObj = Object.create(Object.prototype);
	var protoStack = [];
	var protoSeeker = _obj;

	while (protoSeeker !== null) {
		protoStack.push(protoSeeker);
		protoSeeker = Object.getPrototypeOf(protoSeeker);
	}
	//Pop the {}
	protoStack.pop();

	while (protoStack.length > 0) {
		obj.copyOwnProperties(newObj, protoStack[protoStack.length-1]);
		protoStack.pop();
	}
	return newObj;
};

//
obj.compareOwnProperties = function (_obj_1, _obj_2) {
	var propName_1 = Object.getOwnPropertyNames(_obj_1);
	var propName_2 = Object.getOwnPropertyNames(_obj_2);
	var remainingPropName_1 = propName_1.slice();
	var remainingPropName_2 = propName_2.slice();

	//FIXME: Once the Array library finishes, remember to remove these redundant code.
	//Code tribute to eyelidlessness on StackOverflow
	var contains = function (needle) {
		// Per spec, the way to identify NaN is that it is not equal to itself
		var findNaN = needle !== needle;
		var indexOf;

		if(!findNaN && typeof Array.prototype.indexOf === 'function') {
			indexOf = Array.prototype.indexOf;
		} else {
			indexOf = function(needle) {
				var i = -1, index = -1;
				for(i = 0; i < this.length; i++) {
					var item = this[i];

					if((findNaN && item !== item) || item === needle) {
						index = i;
						break;
					}
				}
				return index;
			};
		}
		return indexOf.call(this, needle) > -1;
	};

	//FIXME: Once the Array library finishes, remember to remove these redundant code.
	//Code tribute to kennebec on StackOverflow
	var remove = function (arr) {
		var what, a = arguments, L = a.length, ax;
		while (L > 1 && arr.length) {
			what = a[--L];
			while ((ax= arr.indexOf(what)) !== -1) {
				arr.splice(ax, 1);
			}
		}
		return arr;
	};

	propName_1.forEach(function (nme) {
		if (contains.call(propName_2, nme)) {

			if (_obj_1[nme] !== _obj_2[nme]) {
				return false;
			} else {
				//Remove the entry to improve performance
				remove(remainingPropName_1, nme);
				remove(remainingPropName_2, nme);
			}
		} else {
			return false;
		}
	});

	remainingPropName_2.forEach(function (nme) {
		if (contains.call(propName_1, nme)) {
			if (_obj_1[nme] !== _obj_2[nme]) {
				return false;
			}
		} else {
			return false;
		}
	});

	return !!(remainingPropName_1.length <= 0 && remainingPropName_2 <= 0);
};

//TODO: FINISH THIS ONE
//Compare two object by scanning through all of their properties and prototypes
obj.compareProperties = function (_obj_1, _obj_2) {
	var obj_1_tracker = _obj_1;
	var obj_2_tracker = _obj_2;

	while (obj_1_tracker !== null) {
		while (obj_2_tracker !== null) {



		}
	}
};

//Unfreeze the object
obj.unfreeze = function (_obj) {
	var _new_obj = undefined;
	if(_obj instanceof Array) {
		_new_obj=[];
		var clone = function(v) {
			_new_obj.push(v)
		};
		_obj.forEach(clone);
	} else if(_obj instanceof String){
		_new_obj = new String(_obj).toString();
	} else if(typeof _obj =='object'){
		_new_obj = {};
		for (var property in _obj) {
			_new_obj[property] = _obj[property];
		}
	}
	return _new_obj;
};

Object.freeze(obj);

module.exports = {
	str: str,
	obj: obj,
	num: num
};
