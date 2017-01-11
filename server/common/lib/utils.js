var fs=require('fs');
var url = require('url');
var querystring = require('querystring');
var utils = {};
module.exports = utils;

// 路径check方法
utils.dirCheck = function(dir){
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
}

// 空判断
utils.isEmpty = function(obj){
	if (typeof (obj) == 'undefined' || obj == null || obj === '') {
		return true;
	}
	return false;
}

// queryAll查询数据封装
utils.doPackA = function(data){
	var responseData = {};
	responseData.content = {};
	// 数据
	responseData.content.list = data;
    // 数据个数
    responseData.content.totalRecords = data.length;

	return responseData;
}

// queryOne查询数据封装
utils.doPackD = function(data){
	var responseData = {};
	responseData.content = {};
	// 数据
	responseData.content.list = data.toJSON().contents;
    // 数据个数
    responseData.content.totalRecords = data.toJSON().contents.length;

	return responseData;
}
// URL参数解析
utils.parseUrlParams = function(_url){
	var urlParams = url.parse(_url).query;
	var params = querystring.parse(urlParams);
	return params;
}