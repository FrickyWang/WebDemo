// DB查询操作
define(["angular"], function(angular) {
	
	function resource(params) {
		angular.extend(this, params);
		this.dbUrl = 'http://127.0.0.1:3000';
	}
	// 设置request
	resource.prototype.use = function(req) {
		this.request = req; 
		return this;
	};
	// 设置路径
	resource.prototype.setBaseUrl = function(url) {
		this.baseUrl = url; 
		return this;
	};
	// ALL查询
	resource.prototype.queryAll = function(params) {
		return this.request.get(this.dbUrl + this.baseUrl, params);
	}
	// One查询
	resource.prototype.queryOne = function(subUrl, params) {
		return this.request.get(this.dbUrl + this.baseUrl + "/" + subUrl, params);
	}
	// 查询信息
	resource.prototype.queryInfor = function(subUrl1, subUrl2, params) {
		return this.request.get(this.dbUrl + this.baseUrl + "/" + subUrl1 + "/" + subUrl2, params);
	}
	return resource;
});