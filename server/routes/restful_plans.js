var Plans = require('../models/plans.js');
var log4js = require('../logJs/log');
//var express = require('express');
//var router = express.Router();
var log=log4js.getLogger();

// 列表
exports.list = function (req, res) {
    Plans.find({}, function (err, doc) {
        res.json(doc);
    });
};

// 详情
exports.detail = function (req, res) {
    Plans.findOne({_id: req.params.id}, function (err, doc) {
        res.json(doc);
    });
};

// 新增
/*exports.add = function (req, res) {
    var plans = new Plans(req.body);
    plans.save(function (err, doc) {
        res.send({state: 1, doc: doc});
    });
};

// 修改
exports.edit = function (req, res) {
    // 删除主键，否则无法保存
    delete req.body._id;

    Recipe.update({_id: req.params.id}, req.body, function (err, doc) {
        res.send({state: 1, doc: doc});
    });
};

// 删除
exports.del = function (req, res) {
    Recipe.remove({_id: req.params.id}, function (err, doc) {
        res.send({state: 1, doc: doc});
    });
};*/

//module.exports = router;