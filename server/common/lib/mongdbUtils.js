var mongdbUtils = require('mongoose');
var log = require('../../logJs/logApp');
var utils=require('./utils.js');

// 数据库连接
mongdbUtils.connect('mongodb://127.0.0.1:27017/test');
var db = mongdbUtils.connection;
db.on('error',function(){log.writeDebug('DB连接错误')});
db.once('open',function(){
	log.writeInfo('DB连接成功');
});

// queryAll方法
mongdbUtils.list = function (entyObj, req, res) {
    entyObj.find(utils.parseUrlParams(req.url), function (err, doc) {
        log.writeDebug(doc);
        // 数据封装后返回
        res.json(utils.doPackA(doc));
    });
};

// queryOne方法
mongdbUtils.detail = function (entyObj, req, res) {
    entyObj.findOne(utils.parseUrlParams(req.url), function (err, doc) {
    	log.writeDebug(doc);
    	// 数据封装后返回
        res.json(utils.doPackD(doc));
    });
};

module.exports = mongdbUtils;