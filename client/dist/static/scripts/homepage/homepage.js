define("homepage/homepage", ["WebDemo"], function(WebDemo) {
	WebDemo.controller("homeContextCtrl", ["$scope", "$http", "$filter", "Plan", function($scope, $http, $filter, Plan){
		var sucFunc = function (dataList) {
			$scope.plans = [];
			$scope.otherPlans = [];
			angular.forEach(dataList, function(list) {
				if (list.starPlan) {
					$scope.plans.push(list);
				}
			}); 
			$scope.otherPlans = dataList.slice(0, 6);
		}
		
		var tranFilter = $filter("translate");
		// 主页面轮播广告内容
		$scope.news = [{
			href: "https://www.dianrong.com/mkt/news/desktop/57bed4bd495e1f2900f68512.html",
			image: "n_1",
			title: tranFilter("homepage.news_title_1"),
			content: tranFilter("homepage.news_content_1")
		}, {
			href: "https://www.dianrong.com/mkt/news/desktop/56f4e52cbb7bef1800a6f274.html",
			image: "n_2",
			title: tranFilter("homepage.news_title_2"),
			content: tranFilter("homepage.news_content_2")
		}, {
			href: "https://www.dianrong.com/mkt/news/desktop/56e7e19647a7921900d266ff.html",
			image: "n_4",
			title: tranFilter("homepage.news_title_4"),
			content: tranFilter("homepage.news_content_4")
		}, {
			href: "https://www.dianrong.com/mkt/news/desktop/569c9053522a4518004f76c5.html",
			image: "n_5",
			title: tranFilter("homepage.news_title_5"),
			content: tranFilter("homepage.news_content_5")
		}];
        
        // 查询产品
		Plan.queryAll().then(function(responseData) {
			sucFunc(responseData);
		});
	}]);
});