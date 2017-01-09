define(["angular", "models/lib/codec", "models/lib/crypto"], function(angular, codec) {
	
	function request($http, $q, Crypto) {
		this.$http = $http;
		this.$q = $q;
		this.crypto = Crypto;
	}
	
	request.prototype.emit = function(params) {
		var qService = this.$q;
		return this.$http(params).then(function(response) {
			var rData = response.data;
			// alert(JSON.stringify(rData))
			// return rData && "success" === rData.result ? rData : qService.reject(rData);
			return rData ? rData : qService.reject(rData);
		}, function(response) {
			return qService.reject(response.data);
		});
	};
	
	//get方法
	request.prototype.get = function(url, params, padParams) {
		var eParams = angular.extend({
			method: "GET",
			url: url,
			params: params
		}, padParams);
		return this.emit(eParams);
	};
	// jsonp方法
	request.prototype.jsonp = function(url, params, padParams) {
		var tmpParams = angular.extend(params, {
			callback: "JSON_CALLBACK"
		});
		var eParams = angular.extend({
			method: "GET",
			url: url,
			params: tmpParams
		}, padParams);
		return this.emit(eParams);
	};
	// post方法
	request.prototype.post = function(url, params, padParams) {
		var strParams = '';
		if (params) {
			if (padParams && padParams.encrypt) {
				params = this.encryptParams(params, padParams.encrypt);
				strParams = codec.encode(params);
			}
		}
		var eParams = t.extend({
			method: "POST",
			url: url,
			data: strParams,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}, padParams);
		return this.emit(eParams);
	};	
	// 参数加密
	request.prototype.encryptParams = function(params, encryptParams) {
		var crypto = this.crypto;
		var tmpParams = angular.extend({}, params);
		if (!crypto.enabled()) {
			return tmpParams;
		}
		if (!encryptParams || 0 === encryptParams.length) {
			return tmpParams;
		}
		var tmpArray = [];
		angular.forEach(encryptParams, function(items) {
			if(params[items]){
				tmpParams[items] = crypto.encrypt(params[items]);
				tmpArray.push(items);
			}
		});
		tmpParams.encryptedParam = tmpArray.join(";");
		return tmpParams;
	};
	// 防止js mini化时改变变量名称，通过这种方式注入变量
	request.$inject = ["$http", "$q", "Crypto"];
	
	return request;
});