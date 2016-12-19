define("homepage/homepage", ["WebDemo"], function(WebDemo) {
	WebDemo.controller("homeContextCtrl", ["$scope", "$http", "Plan",function($scope, $http, Plan){
		var sucFunc = function (dataList) {
			$scope.plans = [];
			angular.forEach(dataList, function(list) {
				$scope.plans.push(list);
			}); 
			//$scope.otherPlans = t.slice(0, 6)
		}
        
        // ²éÑ¯²úÆ·
		Plan.queryAll().then(function(responseData) {
			sucFunc(responseData);
		});


	}]);
});