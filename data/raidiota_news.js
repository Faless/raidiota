var jso=window.content.document.defaultView.wrappedJSObject;
// Disable auto refresh
jso.refreshByJS = false;
var ul = document.getElementById("FocusNews").getElementsByClassName("edit")[0];
var temp = ul.getElementsByTagName("a");
var a = [];
for( var i = 0; i < temp.length; i++ ) {
    if( temp[i].getAttribute("href") == "#" || temp[i].getAttribute("href").startsWith("PublishingBlock") )
      a.push(temp[i]);
}
for( var i = 0; i < a.length; i++ ) {
    a[i].addEventListener(
	"click",
    function() {
	setTimeout(function(){
	    var div = document.getElementById("silverlightControlHost");
	    var uri = parseObject(document.getElementById("SilverlightControl"));
	    embedVideos(div, uri, uri, "480", "320");
	}, 1000)
    }, false)
}
