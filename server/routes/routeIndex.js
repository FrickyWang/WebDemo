var fs=require('fs');
var mongdbUtils=require('../common/lib/mongdbUtils.js');

var routeIndex = {};
module.exports = routeIndex;

// 获取路由配置文件
//fs.readFileSync("routes/routes.json","utf8")
var configContent = JSON.parse(fs.readFileSync("routes/routesConfig.json","utf8"));

routeIndex.parseUrl = function(url, req, res){
	for(var i=0;i<configContent["routes"].length;i++){
		if (configContent["routes"][i].url == url) {
			var dBentity = require(configContent["routes"][i].entityUrl);
			//console.log(configContent["routes"][i].entityUrl);
			//console.log(dBentity);
			if (configContent["routes"][i].method == 'list') {
				mongdbUtils.list(dBentity, req, res);				
			}
		}
	}
}