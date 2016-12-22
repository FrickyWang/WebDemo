var fs=require('fs');
var utils = {};
module.exports = utils;

// Â·¾¶check·½·¨
utils.dirCheck = function(dir){
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
}

// ¿ÕÅÐ¶Ï
utils.isEmpty = function(obj){
	if (typeof (obj) == 'undefined' || obj == null || obj === '') {
		return true;
	}
	return false;
}
