/*
* Define some arbitrary functions
*/
var foo = function(arg) {
    if (arg) 
        console.log("foo!:", arg);
    else
        console.log("foo!");
};

var bar = function() {
    console.log("bar!");
};

var baz = function() {
    console.log("baz!");
};


/*
* Pub stuff, Sub stuff
*/

var $ = new PubSub();

var a1 = $.subscribe("foo", foo);
var a2 = $.subscribe("bar", bar);
var a3 = $.subscribe("baz", baz);

$.publish("foo", "fee");
$.publish("bar");
$.publish("baz");

console.log('\n');
$.unsubscribe(a1);
$.print();
$.publish("foo", "fee"); // should error

console.log('\n');
var a4 = $.subscribe("foo", bar);
var a5 = $.subscribe("foo", baz);
$.publish("foo");

console.log('\n');
$.unsubscribe(a4);
$.publish("foo");
