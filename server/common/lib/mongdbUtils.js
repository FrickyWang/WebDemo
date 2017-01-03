var mongdbUtils = require('mongoose');
var log = require('../../logJs/logApp');
// 数据库连接
mongdbUtils.connect('mongodb://127.0.0.1:27017/test');
var db = mongdbUtils.connection;
db.on('error',function(){log.writeDebug('DB连接错误')});
db.once('open',function(){
	log.writeInfo('DB连接成功');
});

mongdbUtils.list = function (entyObj, req, res) {
    entyObj.find({}, function (err, doc) {
        log.writeDebug(doc);
        res.json(doc);
    });
};

module.exports = mongdbUtils;