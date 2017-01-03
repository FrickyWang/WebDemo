// 收益信息格式化
define([], function() {
	function plan(obj) {
		// 数字格式化
		var valueFormat = function(value) {
			var value_100 = 100 * value;
			var valueInt = parseInt(value_100.toFixed());
			return isNaN(value_100) ? 0 : value_100.toFixed(1) == valueInt ? valueInt : value_100.toFixed(1)
		};
		return function(t) {
			return obj.interestDownLimit && obj.interestUpLimit || obj.intRateDownLimit && obj.intRateUpLimit ? valueFormat(obj.interestDownLimit || obj.intRateDownLimit) + "-" + valueFormat(obj.interestUpLimit || obj.intRateUpLimit) : valueFormat(obj.intRate || obj.rate);
		}
	}
	// 防止js mini化时改变变量名称，通过这种方式注入变量
	plan.$inject = ["$filter"];
	
	return {
		planIntRate: plan
	}
});