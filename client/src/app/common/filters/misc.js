// 资源获取Filter
define([], function() {
    function translate(tranServices) {
		return function(value) {
			return tranServices.translate(value);
        };
    }
    // 注入Translate 服务
	translate.$inject = ["Translate"];
	
	return {
		translate: translate
    };
});