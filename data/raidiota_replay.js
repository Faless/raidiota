var Requester = function() {
    function _Requester() {
	this._REQUESTS = {};
	this._ID = 0;

	var THAT = this;
	self.port.on("response", function(data) {
	    var req = THAT._REQUESTS[data.id];
	    req.func.apply(req.obj, [data]);
	    delete THAT._REQUESTS[data.id];
	});
    }

    _Requester.prototype.GET = function(theUrl, onResponse, funcObj) {
	this._REQUESTS[this._ID] = {
	    func: onResponse,
	    obj: funcObj
	}
	var THAT = this;
	self.port.emit("request", {
	    url: theUrl,
	    id: THAT._ID
	});
	this._ID++;
    }
    return new _Requester();
}();

var jso=window.content.document.defaultView.wrappedJSObject;

var NAMES = {};

function parseNames(data) {
    var parsed = data.json;
    for (var i = 0; i < parsed["Channels"].length; i++) {
	var chan = parsed["Channels"][i];
	NAMES[chan["id"]] = chan["tag"];
    }
    getVideoFromHash();
}

Requester.GET(
    "http://www.rai.tv/dl/RaiTV/iphone/android/smartphone/advertising_config.html",
    parseNames,
    null);

var div = document.getElementById("SilverlightPlayer").parentNode;
function doEmbed(data) {
    var list = data.json[this.chan][this.date];
    if( list ) {
	for (prop in list) {
	    if( list[prop]['i'] == this.id ) {
		if( list[prop]["h264"] ) {
		    div.innerHTML = "";
		    embedVideos(div, list[prop]["h264"], list[prop]["h264"], "544", "340");
		    break;
		}
	    }
	}
    }
}

function getVideoFromHash() {
    var query = {};
    var temp = window.location.hash.substring(1, window.location.hash.length).split("&");
    for( var i = 0; i < temp.length; i++ ) {
	var split = temp[i].split("=");
	query[split[0]] = split[1];
    }
    if( query["v"] ) {
	var url = "http://www.rai.tv/dl/portale/html/palinsesti/replaytv/static/" + NAMES[query["ch"]] + "_" + query["vd"].replace(/-/g,"_") + ".html";
	Requester.GET(
	    url,
	    doEmbed,
	    {
		id: query["v"],
		date: query["vd"],
		chan: query["ch"]
	    }
	    );
    }
}

window.addEventListener ("hashchange", function(){
    getVideoFromHash();
}, false);
