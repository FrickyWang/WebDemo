define("controllers/common/header",["WebDemo"], function(WebDemo){
	WebDemo.controller("HeaderCtrl",["$scope", function($scope){
		$scope.isAuthenticated = true;
	}]);
});