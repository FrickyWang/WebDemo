//从高到低ERROR,WARN,INFO,DEBUG
var log4js=require('log4js');
var fs=require('fs');
var config=require('./config.json');
var utils=require('../common/lib/utils.js');
var configContent = JSON.parse(fs.readFileSync("logJs/config.json","utf8"));

// 判断路径是否存在
for(var i=0;i<configContent["appenders"].length;i++){
	var arryData = configContent["appenders"][i];
	if (!utils.isEmpty(arryData.filename)) {
		var tmpData = arryData.filename.split('/');
		utils.dirCheck(tmpData[0]);
		utils.dirCheck(tmpData[0]+'/'+tmpData[1]);
	}
}

// 加载配置文件
log4js.configure(config);

// 获取不同日志对象
var logApp=log4js.getLogger('logApp');

// info日志
log4js.writeInfo = function(msg){
	if (utils.isEmpty(msg)){
		msg = "";
	}
	logApp.info(msg);
}

// bug日志
log4js.writeDebug = function(msg){
	if (utils.isEmpty(msg)){
		msg = "";
	}
	logApp.debug(msg);
}

// warn日志
log4js.writeWarn = function(msg){
	if (utils.isEmpty(msg)){
		msg = "";
	}
	logApp.warn(msg);
}

// error日志
log4js.writeError = function(msg){
	if (utils.isEmpty(msg)){
		msg = "";
	}
	logApp.error(msg);
}

// 记录客户端的请求信息
log4js.use = function(app){
	app.use(log4js.connectLogger(logApp,{level:'INFO',format:':method:url'}));
}

module.exports = log4js;