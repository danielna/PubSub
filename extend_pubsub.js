
// Warning: this needs some serious cleanup/refactoring.
// Just trying to hash out some ideas.

// PubSub System
// Use prototypal inheritance to extend Models and Views with Events
// A different style of pubsub than the mediator pattern.

// Todo:
// Write unsubscribe function
// Also consider the implications of pub/sub using an id,
// or more importantly if this will even work if I don't use it.
// Context, context, context!
// Clean this up like crazy.


// Events object
function Events() {
    this.events = {};
}

Events.prototype.subscribe = function(topic, fn) {
    if (!this.events[topic]) {
        this.events[topic] = [];
    }
    
    this.events[topic].push(fn);
};

Events.prototype.publish = function(topic){
    if (!this.events[topic]) {
        console.error(topic + " not found");
        return false;
    } else {
        for (var i = 0; i < this.events[topic].length; i++) {
            this.events[topic][i]();
        }
    }
    return true;
};



// Model
function Model(){
    this.properties = {};
}

Model.prototype = new Events();
Model.prototype.constructor = Events;

Model.prototype.get = function(name) {
    if (this.properties.hasOwnProperty(name)){
        return this.properties[name];
    } else {
        console.error(name + " is not a property of this model.");
    }
};

Model.prototype.set = function(name, val) {
    this.properties[name] = val;
    this.publish('set');
};

Model.prototype.foobar = function(){
    this.publish('foobar');
};



// View
function View(model) {
    this.model = model;
    this.model.subscribe('set', function() {
        console.log("model value is set!");
    });
    this.model.subscribe('foobar', this.foobar);
}

View.prototype = new Events();
View.prototype.constructor = Events;

View.prototype.render = function() {
    console.log(this.model.properties);
};

View.prototype.foobar = function() {
    console.log('foobar!');
};



var test = new Model();
var testView = new View(test);
test.set("foo", "bar");

console.log(test.get("foo"));

testView.render();
test.foobar();
