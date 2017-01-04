// 模型index
define(["angular", "models/lib/request", "models/lib/crypto","models/lender/plan"], function(angular, request, crypto, plan) {
	var models_index = angular.module("webDemo.models", []).service("Request", request).constant("CryptoConfig", crypto.CryptoConfig).service("Crypto", crypto.Crypto).service("Plan", plan);
	return models_index;
});