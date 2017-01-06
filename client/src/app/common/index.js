// 共同index
define(["angular", "common/services/utils", "common/services/translate", "common/filters/plan", "common/filters/misc", "common/filters/string"], function(angular, utilsServices, tranServices, planFilter, miscFilter, stringFilter) {
	var common_index = angular.module("webDemo.common", []).service("Utils", utilsServices).service("Translate", tranServices).filter("planIntRate", planFilter.planIntRate).filter("translate", miscFilter.translate).filter("slStringTruncate", stringFilter.slStringTruncate);
	return common_index;
});