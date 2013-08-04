function embedVideos(div, mp4, wmv, width, height) {
    width = width ? width : "320";
    height = height ? height : "240";
    var video = document.createElement("video");
    var nodes = new Array();
    nodes.push(document.createElement("br"));
    nodes.push(document.createTextNode("Se il tuo browser non supporta nessuno di questi formati. Puoi probabilmente aprirli con VLC:"));
    nodes.push(document.createElement("br"));
    video.setAttribute("width", "320");
    video.setAttribute("height", "240");
    if( mp4 ) {
	var source = document.createElement("source");
	source.setAttribute("src", mp4);
	source.setAttribute("type", "video/mp4")
	video.appendChild(source);
	nodes.push(document.createTextNode("MP4: "));
	var tempNode = document.createElement("a");
	tempNode.setAttribute("href", mp4);
	tempNode.appendChild(document.createTextNode("Scarica ORA!"));
	nodes.push(tempNode);
	nodes.push(document.createElement("br"));
    }
    if( wmv ) {
	var source = document.createElement("source");
	source.setAttribute("src", wmv);
	source.setAttribute("type", "video/wmv")
	video.appendChild(source);
	nodes.push(document.createTextNode("WMV: "));
	var tempNode = document.createElement("a");
	tempNode.setAttribute("href", wmv);
	tempNode.appendChild(document.createTextNode("Scarica ORA!"));
	nodes.push(tempNode);
	nodes.push(document.createElement("br"));
    }

    var obj = document.createElement("object");
    obj.setAttribute("width", width);
    obj.setAttribute("height", height);
    obj.setAttribute("classid", "CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6");
    obj.setAttribute("codebase", "http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701");
    obj.setAttribute("standby", "Loading...");
    obj.setAttribute("type", "application/x-oleobject");
    function addParam(name, value) {
	var param = document.createElement("param");
	param.setAttribute("name", name);
	param.setAttribute("value", value);
	obj.appendChild(param);
    }
    addParam("url",wmv != null ? wmv : mp4);
    addParam("allowchangedisplaysize","true");
    addParam("autosize","true");
    addParam("displaysize","1");
    addParam("showcontrols","true");
    addParam("showstatusbar","true");
    addParam("autorewind","true");
    addParam("autostart","true");
    addParam("volume","100");

    var embed = document.createElement("embed");
    embed.setAttribute("type","application/x-mplayer2");
    embed.setAttribute("src", wmv != null ? wmv : mp4);
    embed.setAttribute("align","middle");
    embed.setAttribute("width",width);
    embed.setAttribute("height",height);

    obj.appendChild(embed);
    //video.appendChild(obj);

    div.innerHTML = ""
    //div.appendChild(video);
    div.appendChild(obj);
    for(var j = 0; j < nodes.length; j++) {
	div.appendChild(nodes[j]);
    }
    div.setAttribute("style", div.getAttribute("style") + ";background-color: white !important");
}

function parseObject(obj) {
    params = obj.getElementsByTagName("param");
    for( var i = 0; i < params.length; i++ ) {
	if( params[i].getAttribute("name") == "initParams" ) {
	    var opts = params[i].getAttribute("value").split(",");
	    for( var j = 0; j < opts.length; j++ ) {
		if( opts[j].startsWith("mediaUri=") )
		  return opts[j].replace("mediaUri=", "");
	    }
	}
    }
    return "";
}
