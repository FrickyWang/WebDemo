define(["angular", "common/filters/plan"], function(angular, planFilter) {
	var common_index = angular.module("webDemo.common", []).filter("planIntRate", planFilter.planIntRate);
	return common_index
});