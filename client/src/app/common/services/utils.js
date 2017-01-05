define([], function() {
	function utils() {
	}
	// 判断空函数
	utils.prototype.isEmpty = function(data){
		if (typeof (data) == 'undefined' || data == null || data === '') {
            return true;
        }
        return false;
    };
	
    return utils;
});