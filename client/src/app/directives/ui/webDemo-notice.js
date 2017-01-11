define("directives/ui/webDemo-notice",["directives/index"], function(directives_index) {
	directives_index.directive("webdemoNotice", ["$http", "$interval", function($http, $interval) {
		return {
			restrict: "EA",
			replace: true,
			template: '<div class="dr-notification" ng-show="notice.length > 0"><ul id="slide-notice"><li ng-repeat="n in notice"><a target="_bank" ng-href="{{n.staticLink}}">{{n.name}}</a></li></ul></div>',
			link: function($scope) {
				var mainDiv = $(".dr-notification");
				var heightDiv = mainDiv.height();
				var num = 0;
				var timer = null;
		   	   	var params = {
					platform: "desktop"
				};
	   			var config = {
					method: "GET",
					url: "http://127.0.0.1:3000/feapi/announcements/current",
					params: params
				};
				
				// 设置计时器,根据notice个数计算div高度
				function setTimer() {
					timer = $interval(function(){
						num++;
						if(num > $scope.count - 1){
							num = 0;
					    }
						$("#slide-notice").animate({
							top: -num * heightDiv
						});
					}, 3000);
				}
				// 获取notice信息
				$http(config).success(function(responseData){
					if (responseData && responseData.content){
						$scope.notice = responseData.content.list;
						$scope.count = responseData.content.totalRecords;
					}
				});
				// mouseout事件
				mainDiv.bind("mouseout", function(){
					setTimer();
				});
				// mouseover事件
				mainDiv.bind("mouseover", function() {
					$interval.cancel(timer);
				});
				// 设置计时器
				setTimer();
			}
		};
	}]);
});
