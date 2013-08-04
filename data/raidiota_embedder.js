function embedVideos(div, mp4, wmv) {
    
    var video = document.createElement("video");
    var nodes = new Array();
    nodes.push(document.createElement("br"));
    nodes.push(document.createTextNode("Se il tuo browser non supporta nessuno di questi formati. Puoi, molto probabilmente, aprirli con VLC:"));
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
    div.innerHTML = ""
    div.appendChild(video);
    for(var j = 0; j < nodes.length; j++) {
        div.appendChild(nodes[j]);
    }
    div.setAttribute("style", div.getAttribute("style") + ";background-color: white !important");
}