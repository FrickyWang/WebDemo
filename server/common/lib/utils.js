var fs=require('fs');
var utils = {};
module.exports = utils;

// ·��check����
utils.dirCheck = function(dir){
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
}

// ���ж�
utils.isEmpty = function(obj){
	if (typeof (obj) == 'undefined' || obj == null || obj === '') {
		return true;
	}
	return false;
}
