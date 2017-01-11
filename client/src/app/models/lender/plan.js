// 业务类型
define(["models/lib/resource", "models/lib/request"], function(Resource) {
	function plan($http, $q, $sce, Request) {
		this.$http = $http; 
		this.$q = $q; 
		this.$sce = $sce; 
		Resource.call(this, {
			request: Request,
			baseUrl: "/api/v2/plans",
			dbUrl:"http://127.0.0.1:3000"
		});
	}
	
	// 继承resource
	plan.prototype = new Resource({});
	plan.prototype.constructor = plan;
	
	// ALL查询
	plan.prototype.queryAll = function(params) {
		var me = this;
		return this.request.get(this.dbUrl + "/feapi/plans", params).then(function(response) {
			return response;
		}, function(response) {
			return me.$q.reject(response);
		});
	};
	
	// One查询
	plan.prototype.queryOne = function(subUrl, params) {
		var me = this;
		return this.request.get("/feapi/plans/" + subUrl, params).then(function(response) {
			return response;
		}, function(response) {
			return me.$q.reject(response);
		});
	};
	// Faqs查询
	plan.prototype.queryFaqs = function(subUrl, params) {
		return this.request.get("/feapi/plans/" + subUrl + "/faqs", params);
	};
	// GradeRates描述查询
	plan.prototype.getGradeRatesDesc = function() {
		var me = this;
		return this.request.get("/nb/api/public/descriptions?type=profit").then(function(response) {
			return response;
		}, function(response) {
			return me.$q.reject(response);
		});
	};
	plan.prototype.queryInvestments = function(subUrl, params) {
		return this.queryInfor(subUrl, "investments", params);
	};
	plan.prototype.queryLoans = function(subUrl, params) {
		return this.queryInfor(subUrl, "loans", params);
	};
	plan.prototype.queryPossibleLoansSummary = function(subUrl, params) {
		return this.queryInfor(subUrl, "possible/loans/sum", params);
	};
	plan.prototype.queryPossibleLoans = function(subUrl, params) {
		return this.queryInfor(subUrl, "possible/loans/list", params);
	};
	plan.prototype.queryInvestTrend = function(subUrl, params) {
		return this.queryInfor(subUrl, "amount/invest/trend", params);
	};
	plan.prototype.queryTradeTrend = function(subUrl, params) {
		return this.queryInfor(subUrl, "amount/trade/trend", params);
	};
	plan.prototype.queryStatistics = function() {
		return this.request.get(this.baseUrl + "/statistics");
	};
	plan.prototype.queryHouseCities = function(params) {
		return this.request.get("/api/v2/plan/house/cities", params);
	};
	plan.prototype.queryCityChannels = function(params) {
		return this.request.get("/api/v2/plan/house/channels", params);
	};
	plan.prototype.queryChannelConfig = function(params) {
		return this.request.get("/api/v2/plan/house/channel/config", params);
	};
	plan.prototype.queryHousePlanQuota = function(params) {
		return this.request.get("/api/v2/plan/house/quota", params);
	};
	plan.prototype.checkHousePlan = function(params) {
		return this.request.get("/api/v2/plan/house/check", params);
	};
	plan.prototype.queryChannelDescription = function(params) {
		return this.request.get("/nb/api/plans/houseplans/channels/" + params);
	};
	// 防止js mini化时改变变量名称，通过这种方式注入变量
	plan.$inject = ["$http", "$q", "$sce", "Request"];
	return plan;
});