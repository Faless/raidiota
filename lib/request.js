// request.js - RAIDIOTA's module
// author: kenzy88
var Request = require("sdk/request").Request;
exports.GET = function(data, worker) {
    require("sdk/request").Request({
	url: data.url,
	onComplete: function (response) {
	    worker.port.emit("response", {
		json: response.json,
		text: response.text,
		id: data.id,
	    });
	}
    }).get();
}
