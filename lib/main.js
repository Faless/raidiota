// This is an active module of the kenzy88 (1) Add-on
exports.main = function() {};

var data = require("self").data;

var pageMod = require("page-mod");
pageMod.PageMod({
  include: "http://www.rai.tv/dl/RaiTV/programmi/*",
  contentScriptWhen: 'end',
  contentScriptFile: [data.url("raidiota_embedder.js"), data.url("raidiota_raitv.js")]
});

pageMod.PageMod({
  include: "*.tgr.rai.it",
  contentScriptWhen: 'ready',
  contentScriptFile: [data.url("raidiota_embedder.js"), data.url("raidiota_tgr.js")]
});