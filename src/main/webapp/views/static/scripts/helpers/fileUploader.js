define(function(require) {
	var http = require("api");
	var data = {};
	data.uploadFile = function(files, onUpload) {
		var data = new FormData();
		data.append("file", files[0]);
		if(files){
			return http.post("/api/uploadcsv", data, {data: data, processData: false, contentType: false}).done(function(res) {
				onUpload();
			});
		}
	}
	return data;
})