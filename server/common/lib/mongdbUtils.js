var mongdbUtils = require('mongoose');
var log = require('../../logJs/logApp');
mongdbUtils.connect('mongodb://127.0.0.1:27017/test');

mongdbUtils.list = function (entyObj, req, res) {
    entyObj.find({}, function (err, doc) {
        log.writeDebug(doc);
        res.json(doc);
    });
};

module.exports = mongdbUtils;