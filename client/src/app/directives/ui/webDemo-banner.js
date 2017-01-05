define(["directives/index"], function(directives_index) {
	directives_index.directive("webDemoBanners", ["$interval", function(n) {
		return {
			templateUrl: "/resource/static/directives/ui/sl-banner",
			transclude: true,// 
			restrict: "A", // 申明形式,属性
			controller: ["$scope", "$element", "$attrs", function(e, r, t) {
				function i() {
					for (var n = e.banners.length, r = 0, t = o / n, i = u + t / 2; r < n; r++) e.indicators.push({
						left: i + r * t
					})
				}
				function s() {
					c(), a = n(e.next, 1e3 * d)
				}
				function c() {
					a && (n.cancel(a), a = null)
				}
				var a, u = parseFloat(t.border) || 20,
					o = r.width() - 2 * u,
					d = parseFloat(t.interval);
				e.indicators = [], e.banners = [], e.current = {}, this.addBanner = function(n) {
					e.banners.push(n), n.$last && (i(), n["switch"](0))
				}, e["switch"] = function(n) {
					var r = e.banners[n];
					r && (e.current.banner && e.current.banner.hide(), r.show(), e.current.index = n, e.current.banner = r, e.current.left = e.indicators[n].left)
				}, e.next = function() {
					var n = e.current.index + 1;
					e["switch"](e.banners[n] ? n : 0)
				}, e.prev = function() {
					var n = e.current.index - 1;
					e["switch"](e.banners[n] ? n : e.banners.length - 1)
				}, d && (s(), r.bind("mouseleave", function(n) {
					s()
				}), r.bind("mouseenter", function(n) {
					c()
				}))
			}]
		}
	}]), n.directive("slBanner", [function() {
		return {
			scope: !0,
			require: "^slBanners",
			restrict: "A",
			link: function(n, e, r, t) {
				n.show = function() {
					e.removeClass("ng-hide")
				}, n.hide = function() {
					e.addClass("ng-hide")
				}, t.addBanner(n)
			}
		}
	}])
});