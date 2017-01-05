// 共同index
define(["angular", "common/services/utils", "common/services/translate", "common/filters/plan", "common/filters/misc"], function(angular, utilsServices, tranServices, planFilter, miscFilter) {
	var common_index = angular.module("webDemo.common", []).service("Utils", utilsServices).service("Translate", tranServices).filter("planIntRate", planFilter.planIntRate).filter("translate", miscFilter.translate);
	return common_index;
});