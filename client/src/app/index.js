var _requireConfig = {
	baseUrl: WebDemoConfig.staticDomain + WebDemoConfig.scriptsBaseUrl,
	paths: {
		angular: "../tp/angular/angular.min",
		jquery: "../tp/jquery/jquery-3.1.1.min",
		jsencrypt: "../tp/jsencrypt/jsencrypt.min",
		/*"angular.ui.router": "../tp/angular-ui-router/release/angular-ui-router",
		"angular.animate": "../tp/angular-animate/angular-animate",
		"angular.touch": "../tp/latest-tp/libs/angular-touch/angular-touch.min",
		"angular.wizard": "../tp/angular-wizard/angular-wizard",
		"angular.ui.bootstrap": "../tp/angular-bootstrap/ui-bootstrap-tpls.min",
		"angular.ui.utils": "../tp/angular-ui/ui-utils/ui-utils.min",
		"angular.file.upload": "../tp/ng-file-upload/angular-file-upload.min",
		jquery: "../tp/jquery/jquery",
		"jquery.bootstrap": "../tp/bootstrap/dist/js/bootstrap",
		"js.cookie": "../tp/js.cookie/js.cookie.min",
		jqueryUI: "../tp/jquery-ui/ui/jquery-ui-without-tooltip.custom.min",
		"jquery.file.upload": "../tp/jquery.file.upload-9.5.7/js/min/fileupload.all.min",
		"jquery.file.upload.base": "../tp/jquery.file.upload-9.5.7/js/min/jquery.fileupload.min",
		"jquery.iframe.file.upload": "../tp/jquery.file.upload-9.5.7/js/min/jquery.iframe-transport.min",
		"jquery.file.upload.angular-plugin": "../tp/jquery.file.upload-9.5.7/js/jquery.fileupload-angular",
		"load.image": "../tp/jquery.file.upload-9.5.7/js/imagelibs/load-image/js/load-image.min",
		"canvas.to.blob": "../tp/jquery.file.upload-9.5.7/js/imagelibs/canvas-to-blob/js/canvas-to-blob.min",
		underscore: "../tp/underscore/underscore-min",
		"underscore.string": "../tp/underscore.string/underscore.string.min",
		html5shiv: "../tp/html5shiv-1.0/html5shiv",
		highcharts: "../tp/highcharts/highcharts",
		fullcalendar: "../tp/fullcalendar/fullcalendar.min",
		flipclock: "../tp/flipclock/flipclock.min",
		"flatui-checkbox": "../tp/flat-ui/flatui-checkbox",
		"flatui-radio": "../tp/flat-ui/flatui-radio",
		banklist: "./util/bank_list",
		bankcitylist: "./util/bank-city-list",
		"image.preview": "../tp/jquery.file.upload-9.5.7/js/min/load-image.min",
		"image.preview.canvas": "../tp/jquery.file.upload-9.5.7/js/min/canvas-to-blob.min",
		youkuVideo: "../tp/youkuApi/youkuVideo",
		videojs: "../tp/video-js-4.3.0/video-js/video",
		"jquery.placeholder": "../tp/jquery.placeholder/jquery.placeholder",
		modernizr: "../tp/modernizr/modernizr",
		tinycolor: "../tp/tinycolor/tinycolor",
		"bootstrap.colorpicker": "../tp/bootstrap-colorpickersliders/dist/bootstrap.colorpickersliders",
		velocity: "../tp/velocity/velocity.min",
		"velocity.ui": "../tp/velocity/velocity.ui.min",
		"bootstrap.modal": "../tp/bootstrap/js/modal",
		"sl-bootstrap-datetimepicker": "../tp/bootstrap-datetimepicker/js/sl-bootstrap-datetimepicker",
		"sl-bootstrap-datetimepicker-zh-CN": "../tp/bootstrap-datetimepicker/js/locales/sl-bootstrap-datetimepicker.zh-CN",
		slBootstrap: SLConfig.slAppScript ? SLConfig.slAppScript : "./sl-app",
		wechatSDK: "//res.wx.qq.com/open/js/jweixin-1.0.0",
		kindEditorBase: "../tp/kindeditor-4.1.10/kindeditor",
		kindEditor: "../tp/kindeditor-4.1.10/lang/zh_CN",
		swiper: "../tp/swiper/swiper.jquery.min",
		"zepto-modify": "../tp/pageSlider/zepto_modify",
		pageSlider: "../tp/pageSlider/PageSlider",
		jsencrypt: "../tp/jsencrypt/jsencrypt",
		echarts: "../tp/echarts/echarts.common.min",
		gt: "//static.geetest.com/static/tools/gt"*/
	},
	shim: {
		angular: {
			deps: ["jquery"],
			exports: "angular"
		},
		jsencrypt: {
			exports: "JSEncrypt"
		}
		/*"angular.ui.router": ["angular"],
		"angular.animate": ["angular"],
		"angular.touch": ["angular"],
		"angular.ui.bootstrap": ["angular"],
		"angular.ui.utils": ["angular"],
		"angular.wizard": ["angular"],
		"angular.file.upload": ["angular"],
		jqueryUI: ["jquery"],
		"jquery.bootstrap": ["jquery"],
		"jquery.file.upload.base": ["jqueryUI", "jquery.iframe.file.upload"],
		"jquery.iframe.file.upload": ["jquery"],
		"jquery.file.upload": ["jqueryUI"],
		"jquery.file.upload.angular-plugin": ["angular", "jquery.file.upload"],
		fullcalendar: ["jquery"],
		underscore: {
			exports: "underscore"
		},
		"underscore.string": ["underscore"],
		highcharts: {
			deps: ["jquery"],
			exports: "highcharts"
		},
		echarts: {
			exports: "echarts"
		},
		jsencrypt: {
			exports: "JSEncrypt"
		},
		"flatui-checkbox": ["jquery"],
		"flatui-radio": ["jquery"],
		"jquery.placeholder": ["jquery"],
		"bootstrap.colorpicker": ["jquery.bootstrap", "tinycolor"],
		velocity: ["jquery"],
		"velocity.ui": ["velocity"],
		"bootstrap.modal": ["jquery"],
		"sl-bootstrap-datetimepicker-zh-CN": ["jquery", "jquery.bootstrap", "sl-bootstrap-datetimepicker"],
		kindEditor: ["kindEditorBase"],
		swiper: ["jquery"],
		pageSlider: ["zepto-modify"]
	},
	priority: ["angular"],
	urlArgs: "ver=" + SLConfig.buildNumber,
	waitSeconds: 0*/
    }
};
require.config(_requireConfig);
window.WebDemoConfigDefaultDeps = [];
require(["angular","models/index"],function(angular){
	//function webDemo() {
	   var webDemo = angular.module('WebDemo', ["webDemo.models"]);
	   webDemo.config(["CryptoConfig", function(cryptoConfig) {
			/*webDemo.setTriggers({
				mouseenter: "mouseleave",
				click: "click",
				focus: "blur",
				never: "mouseleave"
			});*/
			cryptoConfig.publicKey = WebDemoConfig.publicKey;
		}]);
	   define("WebDemo", [], function() {
			return webDemo;
	   });
	   _addScriptsAndBootstrap(["controllers/common/header","controllers/common/main"], angular);
	   
	   function _addScriptsAndBootstrap(deps, angular) {
	      _addMoreCommonScripts(deps);
	      _bootstrapSLApp(angular);
       }
           
       function _addMoreCommonScripts(deps) {
	      if (deps && deps.length > 0) {
	      	  window.WebDemoConfigDefaultDeps = window.WebDemoConfigDefaultDeps.concat(deps);
	      }
	      if ("undefined" != typeof WebDemoConfig.additionalScripts) {
	      	  window.WebDemoConfigDefaultDeps = window.WebDemoConfigDefaultDeps.concat(WebDemoConfig.additionalScripts);
	      }
       }
       function _bootstrapSLApp(angular) {
	      require(window.WebDemoConfigDefaultDeps, function() {
	      	  // 手动加载模块
		      angular.bootstrap(document, ["WebDemo"]);
		      console.log("WebDemo app initialized :)");
	      });
       }
//}
});