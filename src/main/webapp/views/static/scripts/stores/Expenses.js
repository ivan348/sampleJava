define(function(require) {
    var Reflux = require("reflux");
    var _ = require("lodash");
    var _collection = [];
    var store = Reflux.createStore({
        add: function(item) {
            _collection.push(item);
            this.trigger(_collection);
            return _collection;
        },
        remove: function(item) {
        	_.remove(_collection, { id : item.id });
        	this.trigger(_collection);
        	return item;
        },
        edit: function(item) {
        	var index = _.findIndex(_collection, { id : item.id });
        	_collection[index] = item;
        	this.trigger(_collection);
        	return item;
        },
        set: function(collection) {
            _collection = collection;
            this.trigger(_collection);
            return _collection;
        }
    })
    return store;
})
