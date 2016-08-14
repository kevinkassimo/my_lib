/**
 * Created by kevinqian on 8/13/16.
 */
var lib = require("./my_lib.js");

//Compress
var obj_1 = {
    foo: "foo",
    bar: "bar",
    prop_1: "prop_1"
};

var obj_2 = Object.create(obj_1);

obj_2.bar = "not bar";
obj_2.prop_2 = "prop_2";

var obj_3 = lib.obj.compress(obj_2);

console.log(obj_3);
console.log(Object.getPrototypeOf(obj_3));


var obj_4 = {
    foo: "foo",
    bar: "bar",
    prop_1: "prop_1"
};

var obj_5 = {
    foo: "foo"
};

var obj_6 = {
    foo: "foo",
    bar: "bar",
    prop_1: "prop_2"
};

var obj_7 = {
    foo: "foo"
};

var obj_8 = Object.create(obj_7);

obj_8.bar = "bar";
obj_8.prop_1 = "prop_1";

console.log(lib.obj.compareOwnProperties(obj_1, obj_4));
console.log(lib.obj.compareOwnProperties(obj_1, obj_5));
console.log(lib.obj.compareOwnProperties(obj_1, obj_6));
console.log(lib.obj.compareOwnProperties(obj_1, obj_8));