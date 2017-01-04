/*! WebDemo - v0.0.1-SNAPSHOT - 2017-01-04
 * https://github.com/FrickyWang/WebDemo
 * Copyright (c) 2017 Fricky Wang;
 */
define("models/lib/codec",[],function(){var e=function(e){var t=[];for(var n in e)arrayEncode.hasOwnProperty(n)&&!angular.isUndefined(arrayEncode[n])&&t.push(encodeURIComponent(n)+"="+encodeURIComponent(arrayEncode[n]));return t.join("&")},t=function(e){var t,n,r,o={},u=e.split("&");for(i=0;i<u;i++)t=c.indexOf("="),n=c.slice(0,t),r=c.slice(t+1),o[decodeURIComponent(n)]=decodeURIComponent(r);return o};return{encode:e,decode:t}}),define("models/lib/crypto",["angular","jsencrypt"],function(e,t){function n(e){this.config=e}var r={publicKey:void 0};return n.prototype.enabled=function(){return!!this.config.publicKey},n.prototype.encrypt=function(e){if(this.config.publicKey){var n=new t;return n.setPublicKey(this.config.publicKey),n.encrypt(e)}return e},n.$inject=["CryptoConfig"],{CryptoConfig:r,Crypto:n}}),define("models/lib/request",["angular","models/lib/codec","models/lib/crypto"],function(e,n){function r(e,t,n){this.$http=e,this.$q=t,this.crypto=n}return r.prototype.emit=function(e){var t=this.$q;return this.$http(e).then(function(e){var n=e.data;return n?n:t.reject(n)},function(e){return t.reject(e.data)})},r.prototype.get=function(t,n,r){var o=e.extend({method:"GET",url:t,params:n},r);return this.emit(o)},r.prototype.jsonp=function(t,n,r){var o=e.extend(n,{callback:"JSON_CALLBACK"}),i=e.extend({method:"GET",url:t,params:o},r);return this.emit(i)},r.prototype.post=function(e,r,o){var i="";r&&o&&o.encrypt&&(r=this.encryptParams(r,o.encrypt),i=n.encode(r));var u=t.extend({method:"POST",url:e,data:i,headers:{"Content-Type":"application/x-www-form-urlencoded"}},o);return this.emit(u)},r.prototype.encryptParams=function(t,n){var r=this.crypto,o=e.extend({},t);if(!r.enabled())return o;if(!n||0===n.length)return o;var i=[];return e.forEach(n,function(e){t[e]&&(o[e]=r.encrypt(t[e]),i.push(e))}),o.encryptedParam=i.join(";"),o},r.$inject=["$http","$q","Crypto"],r}),define("models/lib/resource",["angular"],function(e){function t(t){e.extend(this,t),this.dbUrl="http://127.0.0.1:3000"}return t.prototype.use=function(e){return this.request=e,this},t.prototype.setBaseUrl=function(e){return this.baseUrl=e,this},t.prototype.queryAll=function(e){return this.request.get(this.dbUrl+this.baseUrl,e)},t.prototype.queryOne=function(e,t){return this.request.get(this.dbUrl+this.baseUrl+"/"+e,t)},t.prototype.queryInfor=function(e,t,n){return this.request.get(this.dbUrl+this.baseUrl+"/"+e+"/"+t,n)},t}),define("models/lender/plan",["models/lib/resource","models/lib/request"],function(e){function t(t,n,r,o){this.$http=t,this.$q=n,this.$sce=r,e.call(this,{request:o,baseUrl:"/api/v2/plans",dbUrl:"http://127.0.0.1:3000"})}return t.prototype=new e({}),t.prototype.constructor=t,t.prototype.queryAll=function(e){return this.request.get(this.dbUrl+"/feapi/plans",e).then(function(e){return e},function(e){return this.$q.reject(e)})},t.prototype.queryOne=function(e,t){return this.request.get("/feapi/plans/"+e,t).then(function(e){return e},function(e){return this.$q.reject(e)})},t.prototype.queryFaqs=function(e,t){return this.request.get("/feapi/plans/"+e+"/faqs",t)},t.prototype.getGradeRatesDesc=function(){return this.request.get("/nb/api/public/descriptions?type=profit").then(function(e){return e},function(e){return this.$q.reject(e)})},t.prototype.queryInvestments=function(e,t){return this.queryInfor(e,"investments",t)},t.prototype.queryLoans=function(e,t){return this.queryInfor(e,"loans",t)},t.prototype.queryPossibleLoansSummary=function(e,t){return this.queryInfor(e,"possible/loans/sum",t)},t.prototype.queryPossibleLoans=function(e,t){return this.queryInfor(e,"possible/loans/list",t)},t.prototype.queryInvestTrend=function(e,t){return this.queryInfor(e,"amount/invest/trend",t)},t.prototype.queryTradeTrend=function(e,t){return this.queryInfor(e,"amount/trade/trend",t)},t.prototype.queryStatistics=function(){return this.request.get(this.baseUrl+"/statistics")},t.prototype.queryHouseCities=function(e){return this.request.get("/api/v2/plan/house/cities",e)},t.prototype.queryCityChannels=function(e){return this.request.get("/api/v2/plan/house/channels",e)},t.prototype.queryChannelConfig=function(e){return this.request.get("/api/v2/plan/house/channel/config",e)},t.prototype.queryHousePlanQuota=function(e){return this.request.get("/api/v2/plan/house/quota",e)},t.prototype.checkHousePlan=function(e){return this.request.get("/api/v2/plan/house/check",e)},t.prototype.queryChannelDescription=function(e){return this.request.get("/nb/api/plans/houseplans/channels/"+e)},t.$inject=["$http","$q","$sce","Request"],t}),define("models/index",["angular","models/lib/request","models/lib/crypto","models/lender/plan"],function(e,t,n,r){var o=e.module("webDemo.models",[]).service("Request",t).constant("CryptoConfig",n.CryptoConfig).service("Crypto",n.Crypto).service("Plan",r);return o}),define("common/filters/plan",[],function(){function e(){var e=function(e){var t=100*e,n=parseInt(t.toFixed());return isNaN(t)?0:t.toFixed(1)==n?n:t.toFixed(1)};return function(t){return t.interestDownLimit&&t.interestUpLimit||t.intRateDownLimit&&t.intRateUpLimit?e(t.interestDownLimit||t.intRateDownLimit)+"-"+e(t.interestUpLimit||t.intRateUpLimit):e(t.intRate||t.rate)}}return{planIntRate:e}}),define("common/index",["angular","common/filters/plan"],function(e,t){var n=e.module("webDemo.common",[]).filter("planIntRate",t.planIntRate);return n});var _requireConfig={baseUrl:WebDemoConfig.staticDomain+WebDemoConfig.scriptsBaseUrl,paths:{angular:"../tp/angular/angular.min",jquery:"../tp/jquery/jquery-3.1.1.min",jsencrypt:"../tp/jsencrypt/jsencrypt.min"},shim:{angular:{deps:["jquery"],exports:"angular"},jsencrypt:{exports:"JSEncrypt"}}};require.config(_requireConfig),window.WebDemoConfigDefaultDeps=[],require(["angular","models/index","common/index"],function(e){function t(e,t){n(e),r(t)}function n(e){e&&e.length>0&&(window.WebDemoConfigDefaultDeps=window.WebDemoConfigDefaultDeps.concat(e)),"undefined"!=typeof WebDemoConfig.additionalScripts&&(window.WebDemoConfigDefaultDeps=window.WebDemoConfigDefaultDeps.concat(WebDemoConfig.additionalScripts))}function r(e){require(window.WebDemoConfigDefaultDeps,function(){e.bootstrap(document,["WebDemo"]),console.log("WebDemo app initialized :)")})}var o=e.module("WebDemo",["webDemo.models","webDemo.common"]);o.config(["CryptoConfig",function(e){e.publicKey=WebDemoConfig.publicKey}]),define("WebDemo",[],function(){return o}),t(["controllers/common/header","controllers/common/main"],e)}),define("index",function(){});
define("controllers/common/header",["WebDemo"],function(e){e.controller("HeaderCtrl",["$scope",function(e){e.isAuthenticated=!0}])});
define("controllers/common/main",["WebDemo"],function(n){n.controller("MainCtrl",["$scope",function(n){n.isActive=function(n){var o=location.pathname||"/";return n===o}}])});