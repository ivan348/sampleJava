define(function(require) {
	var Reflux = require("reflux");
	var _obj = {};
	var store = Reflux.createStore({
		set: function(obj) {
			_obj = obj;
			this.trigger(_obj);
			return _obj;
		}
	})
	return store;
})