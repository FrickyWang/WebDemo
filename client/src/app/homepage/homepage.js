define("homepage/homepage", ["WebDemo"], function(WebDemo) {
	WebDemo.controller("homeContextCtrl", ["$scope", "$http", "Plan",function($scope, $http, Plan){
		var sucFunc = function (dataList) {
			$scope.plans = [];
			$scope.otherPlans = [];
			angular.forEach(dataList, function(list) {
				if (list.starPlan) {
					$scope.plans.push(list);
				}
			}); 
			$scope.otherPlans = dataList.slice(0, 6)
		}
        
        // 查询产品
		Plan.queryAll().then(function(responseData) {
			sucFunc(responseData);
		});


	}]);
});