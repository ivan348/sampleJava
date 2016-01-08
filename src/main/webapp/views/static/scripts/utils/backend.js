define(function (require) {
	var http = require("api");
	var getCurrencies = function (callback) {
		return http.get("/api/expenses/currencies").done(callback);
	}
	return {
		getCurrencies: getCurrencies
	}
})