var metas = document.getElementsByTagName("meta")

var wmv = null;
var mp4 = null;
for(var i = 0; i < metas.length; i++) {
    var meta = metas[i];
    if( meta.getAttribute("name") == "videourl" ) {
        wmv = meta.getAttribute("content");
    } else if( meta.getAttribute("name") == "videourl_mp4" ) {
        mp4 = meta.getAttribute("content");
    }
}
var div = document.getElementById("silverlightControlHost");
if( div && (wmv || mp4) ) {
    embedVideos(div, mp4, wmv, "544", "340");
}
