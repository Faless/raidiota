function findWMV(string) {
    var temp = string.replace(/\n\s*/g,"");
    if(temp.length > 2) {
        temp = /var videoURL = "([^;]+)"/.exec(temp);
        if(temp != null && temp.length > 1) 
            return temp[1];
    }
    return null;
}

function findMP4(string) {
    temp = string.replace(/\n\s*/g,"");
    if(temp.length > 2) {
        temp = /var videoURL_MP4 = "([^;]+)"/.exec(temp);
        if(temp != null && temp.length > 1) 
            return temp[1];
    }
    return null;
}

var players = document.getElementsByClassName("Player");
var urls = "";
for(var i = 0; i < players.length; i++) {
    var div = players[i];
    var vmw = "";
    var mp4 = "";
    var scripts = players[i].getElementsByTagName("script");
    for(var j = 0; j < scripts.length; j++) {
        wmv = findWMV(scripts[j].innerHTML);
        mp4 = findMP4(scripts[j].innerHTML);
        if( wmv || mp4 )
            break;
    }
    if( wmv || mp4 ) {
        embedVideos(div, mp4, wmv);
    }
}