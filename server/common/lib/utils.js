var fs=require('fs');
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
