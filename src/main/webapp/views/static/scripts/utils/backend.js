define(function (require) {
	var http = require("api");
	var getCurrencies = function (callback) {
		return http.get("/api/expenses/currencies").done(callback);
	}
	var getCategories = function (callback) {
		return http.get("/api/expenses/categories").done(callback);
	}
	return {
		getCurrencies: getCurrencies,
		getCategories: getCategories
	}
})