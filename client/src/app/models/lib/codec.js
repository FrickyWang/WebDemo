// ����ת��
define([], function() {
	// ���к��ֵĲ���ת��ΪURI��ʽ
	var encode = function(encode) {
		var  tmpArray = [];
		for (var property in encode) {
			if (arrayEncode.hasOwnProperty(property) && !angular.isUndefined(arrayEncode[property])) {
				tmpArray.push(encodeURIComponent(property) + "=" + encodeURIComponent(arrayEncode[property]));
			}
		}
		return tmpArray.join("&")
    };
    // URI��ʽת��Ϊ����
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