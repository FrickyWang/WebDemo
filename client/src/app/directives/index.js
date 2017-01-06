// 控件index
define(["angular", "common/index", "models/index"], function(angular, common_index, models_index) {
	var directives_index = angular.module("webDemo.directives", [common_index.name, models_index.name]);
	return directives_index
});
