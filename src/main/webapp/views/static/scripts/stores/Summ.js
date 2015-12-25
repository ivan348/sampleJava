define(function(require) {
    var Reflux = require("reflux");
    var Expenses = require("stores/Expenses");
	var http = require("api");
	var _obj = {};
	var store = Reflux.createStore({
		init: function() {
	        this.listenTo(Expenses, this.get);
	    },
	    get: function(){
			http.get("/api/summ").done(this.set);
	    },
		set: function(obj){
			_obj = obj;
			this.trigger(_obj);
			return _obj;
		}
	})
	return store;
})