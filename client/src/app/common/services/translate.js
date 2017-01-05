// 资源获取服务
define([], function() {
	function translate(Utils) {
		this.Utils = Utils;
	}
	translate.prototype.translate = function(data) {
		if (!this.Utils.isEmpty(resources) && !this.Utils.isEmpty(resources[data])) {
			return resources[data];
		} else {
			return data;
		}
	};
	// 注释注入服务
	translate.$inject=["Utils"];
	return translate;
});
