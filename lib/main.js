// This is an active module of the raidiota Add-on
exports.main = function() {};

var data = require("self").data;

var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "http://www.rai.tv/dl/RaiTV/programmi/*",
  contentScriptWhen: 'end',
  contentScriptFile: [data.url("embedder.js"), data.url("raidiota_raitv.js")]
});

pageMod.PageMod({
  include: "http://www.rai.it/dl/rai/news.html*",
  contentScriptWhen: 'end',
  contentScriptFile: [data.url("embedder.js"), data.url("raidiota_news.js")]
});

pageMod.PageMod({
  include: "*.tgr.rai.it",
  contentScriptWhen: 'ready',
  contentScriptFile: [data.url("embedder.js"), data.url("raidiota_tgr.js")]
});

pageMod.PageMod({
  include: "http://www.rai.tv/dl/replaytv/*",
  contentScriptWhen: 'ready',
  contentScriptFile: [data.url("embedder.js"), data.url("raidiota_replay.js")],
  onAttach: function(worker) {
      worker.port.on("request", function(data) {
	    require("./request").GET(data, worker);
	});
  }
});
