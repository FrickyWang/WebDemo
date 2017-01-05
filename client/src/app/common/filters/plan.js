// 收益信息格式化
define([], function() {
	function plan() {
		// 数字格式化
		var valueFormat = function(value) {
			var value_100 = 100 * value;
			var valueInt = parseInt(value_100.toFixed(),10);
			return isNaN(value_100) ? 0 : value_100.toFixed(1) == valueInt ? valueInt : value_100.toFixed(1);
		};
		return function(input) {
			return input.interestDownLimit && input.interestUpLimit || input.intRateDownLimit && input.intRateUpLimit ? valueFormat(input.interestDownLimit || input.intRateDownLimit) + "-" + valueFormat(input.interestUpLimit || input.intRateUpLimit) : valueFormat(input.intRate || input.rate);
        };
	}
	
	return {
		planIntRate: plan
	};
});