// DB��ѯ����
define(["angular"], function(angular) {
	
	function resource(params) {
		angular.extend(this, params);
		this.dbUrl = 'http://127.0.0.1:3000';
	}
	// ����request
	resource.prototype.use = function(req) {
		this.request = req; 
		return this;
	};
	// ����·��
	resource.prototype.setBaseUrl = function(url) {
		this.baseUrl = url; 
		return this;
	};
	// ALL��ѯ
	resource.prototype.queryAll = function(params) {
		return this.request.get(this.dbUrl + this.baseUrl, params);
	}
	// One��ѯ
	resource.prototype.queryOne = function(subUrl, params) {
		return this.request.get(this.dbUrl + this.baseUrl + "/" + subUrl, params);
	}
	// ��ѯ��Ϣ
	resource.prototype.queryInfor = function(subUrl1, subUrl2, params) {
		return this.request.get(this.dbUrl + this.baseUrl + "/" + subUrl1 + "/" + subUrl2, params);
	}
	return resource;
});