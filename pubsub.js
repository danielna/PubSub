/*
*   Simple pub/sub.
*/

;(function(exports){

    function PubSub () {
        this.topics = {};
        this.uid = -1;
    }

    PubSub.prototype.subscribe = function( topic, fn ){
        if (!this.topics.hasOwnProperty(topic)){ 
            this.topics[topic] = [];
        }
        
        this.topics[topic].push({
            uid: ++(this.uid),
            fn: fn
        });

        console.log("Subscribed to " + topic);
        return this.uid;
    };

    PubSub.prototype.publish = function( topic, args ){
        if (!this.topics.hasOwnProperty(topic)){ 
            console.error("The topic " + topic + " does not exist.");
            return false;
        }

        for (var t in this.topics[topic]){
            this.topics[topic][t].fn(args);
        }

        return true;
    };

    PubSub.prototype.unsubscribe = function( uid ) {
        for (var topic in this.topics) {
            if (this.topics.hasOwnProperty(topic)) {
                for (var i = this.topics[topic].length-1; i >= 0; i--) {
                    var t = this.topics[topic][i];

                    if (t.uid === uid) {
                        this.topics[topic].splice(i, 1);
                        if (this.topics[topic].length === 0) {
                            delete this.topics[topic];
                        }
                        removedUid = uid;
                        console.log("Unsubscribe successful!");
                    }
                }
            }
        }

        return false;
    };

    PubSub.prototype.print = function() {
        console.log(this.topics);
        return;
    };

    exports.PubSub = PubSub;

})(this);
