define("directives/ui/webDemo-banner", ["directives/index"], function(directives_index) {
	directives_index.directive("webdemoBanners", ["$interval", function($interval) {
		return {
			templateUrl: "./templet/webdemo-banner.html",
			transclude: true,
			//template:'<ul class="sl-banner-list clearfix" ng-transclude></ul><ul class="sl-banner-indicator"><li ng-repeat="i in indicators" ng-style="{left: (i.left + 'px')}" ng-click="switch($index)"></li><li class="sl-icon-arrow-left" ng-click="prev()"></li><li class="sl-icon-arrow-right" ng-click="next()"></li><li class="current" ng-style="{left: (current.left + 'px')}"></li></ul>',
			restrict: "A", // 申明形式,属性
			controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
				$scope.indicators = [];
				$scope.banners = []; 
				$scope.current = {};
				var timer; // 定时器 
				var interValue = parseFloat($attrs.interval); // 获取interval属性，间隔时间
				var borderValue = parseFloat($attrs.border) || 20; // 获取border属性，边框宽度
				var picWidth = $element.width() - 2 * borderValue; // 获取图片实际宽度 元素的宽度-边框宽度
				// 计算圆点每次的偏移量
				function getOffside() {
					var bLength = $scope.banners.length;
					var valueA = picWidth / bLength;
					var valueB = borderValue + valueA / 2;
					for (var i = 0; i < bLength; i++){
						$scope.indicators.push({
							left: valueB + i * valueA
						});
					}
				}
				// 启动定时器
				function timerStart() {
					timerCancel();
					timer = $interval($scope.next, 1000 * interValue);
				}
				// 终止定时器
				function timerCancel() {
					if (timer) {
						$interval.cancel(timer);
						timer = null;
					}
				}
				// 加入banner
				this.addBanner = function(scope) {
					$scope.banners.push(scope);
					if (scope.$last) {
						getOffside(); // banner全部加载完成后，计算圆点偏移量
						$scope["switch"](0); //最开始选择第一个banner，使其与第一圆点重合
					}
				};
				$scope["switch"] = function(index) {
					var banner = $scope.banners[index];
					//r && (e.current.banner && e.current.banner.hide(), r.show(), e.current.index = n, e.current.banner = r, e.current.left = e.indicators[n].left)
					if (banner) {
						if ($scope.current.banner) {
							$scope.current.banner.hide();
						}
						banner.show();
						$scope.current.index = index;
						$scope.current.banner = banner;
						$scope.current.left = $scope.indicators[index].left;
					}
				};
				// next方法
				$scope.next = function() {
					var newIndex = $scope.current.index + 1;
					$scope["switch"]($scope.banners[newIndex] ? newIndex : 0);
				};
				// prev方法
				$scope.prev = function() {
					var newIndex = $scope.current.index - 1;
					$scope["switch"]($scope.banners[newIndex] ? newIndex : $scope.banners.length - 1);
				};
				// mouseleave事件
				$element.bind("mouseleave", function() {
					timerStart();
				});
				// mouseenter事件
				$element.bind("mouseenter", function() {
					timerCancel();
				});
				timerStart();
			}]
		};
	}]);
	directives_index.directive("webdemoBanner", [function() {
		return {
			scope: true,
			require: "^webdemoBanners", // 使用父类控制器
			restrict: "A",
			link: function(scope, element, attrs, pController) {
				scope.show = function() {
					element.removeClass("ng-hide");
				};
				scope.hide = function() {
					element.addClass("ng-hide");
				};
				pController.addBanner(scope);
			}
		};
	}]);
});