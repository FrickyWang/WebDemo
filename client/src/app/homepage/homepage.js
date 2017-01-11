define("homepage/homepage", ["WebDemo","directives/ui/webDemo-banner"], function(WebDemo) {
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
		};
		
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
		
		// 媒体评价
		$scope.medias = [{
			link: "https://www.dianrong.com/mkt/news/desktop/57a842afdab128180009236c.html",
			content: tranFilter("homepage.media_1"),
			name: "xhw"
		}, {
			link: "https://www.dianrong.com/mkt/news/desktop/568e1f93011a891800328e76.html",
			content: tranFilter("homepage.media_2"),
			name: "nxzb"
		}, {
			link: "https://www.dianrong.com/mkt/news/desktop/580883b02268aa2900ef4b3a.html",
			content: tranFilter("homepage.media_3"),
			name: "cnbc"
		}, {
			link: "https://www.dianrong.com/mkt/news/desktop/58088f322268aa2900ef4b58.html",
			content: tranFilter("homepage.media_4"),
			name: "cnn"
		}, {
			link: "https://www.dianrong.com/mkt/news/desktop/580891612268aa2900ef4ba5.html",
			content: tranFilter("homepage.media_5"),
			name: "la"
		}];
        
        // 查询产品
		Plan.queryAll().then(function(responseData) {
			sucFunc(responseData.content.list);
		});
	}]);
});