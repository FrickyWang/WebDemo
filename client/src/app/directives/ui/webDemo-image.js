define(["directives/index"], function(directives_index) {
	directives_index.directive("webDemoImage", ["Request", "$q", function(Request, $q) {
		return {
			restrict: "EA", // 申明形式，标签（元素）,属性
			replace: true, // 用标签申明时，标签（元素）被替代
			scope: {
				type: "@"
			},
			template: '<a ng-href="{{imgSource.imgLink}}" target="_blank"><img ng-src="{{imgSource.imgSrc}}"/></a>',
				link: function($scope, $element, $attrs) {
				function getBanner(param) {
					i.get("/feapi/banners", {
						type: param
					}).then(function(response) {
						return i && i.content && i.content.list && i.content.list.length > 0 && (n.imgSource.imgLink = i.content.list[0].link, n.imgSource.imgSrc = i.content.list[0].image, n.imgSource.imgLink || (n.imgSource.imgLink = "javascript:void(0)")), n.imgSource
					}, function(response) {
						return $q.reject(response);
					});
				}
				$scope.imgSource = {
					imgLink: "",
					imgSrc: ""
				};
				getBanner($scope.type);
			}
		}
	}])
});