define("controllers/common/main",["WebDemo","directives/ui/webDemo-notice"], function(WebDemo){
	WebDemo.controller("MainCtrl",["$scope", function($scope){
		$scope.isActive = function(path) {
			var tmplocal = location.pathname || "/";
			return path === tmplocal;
		};
	}]);
});