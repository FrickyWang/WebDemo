// 汉字转换
define([], function() {
	// 带有汉字的参数转换为URI格式
	var encode = function(encode) {
		var  tmpArray = [];
		for (var property in encode) {
			if (arrayEncode.hasOwnProperty(property) && !angular.isUndefined(arrayEncode[property])) {
				tmpArray.push(encodeURIComponent(property) + "=" + encodeURIComponent(arrayEncode[property]));
			}
		}
		return tmpArray.join("&")
    };
    // URI格式转换为汉字
    var decode = function(encode) {
    	    var index;
    	    var name;
    	    var value;
            var obj = {};
    	    var tmpArray = encode.split("&");
			for ( i = 0; i < tmpArray; i++) {
				index = c.indexOf("=");
				name = c.slice(0, index);
				value = c.slice(index + 1);
				obj[decodeURIComponent(name)] = decodeURIComponent(value);
			}
			return obj;
	};
	return {
		encode: encode,
		decode: decode
	}
});