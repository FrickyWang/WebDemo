define(["angular"], function(angular) {
	function string() {
		var strPad = "...";
		return function(data, length, flag) {
			if (flag) {
				return data;
			}
			if (data && angular.isString(data)) {
				var tmpData = ""; 
				for (var i = 0; i < data.length; i++) {
					var dataUnicode = data.charCodeAt(i); // 返回指定位置字符的unicode编码
					tmpData = tmpData + data.charAt(i);
					length = length - 1;
					// 判断是否占用两个字节
					if(dataUnicode > 255){
						length = length - 1;
					}
					if (length <= 3) {
						tmpData = tmpData + strPad;
						break;
					}
				}
				return tmpData;
			}
			return "";
		};
	}
	return {
		slStringTruncate: string
	};
});