var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/test');

var PlansSchema = new Schema({
    loanId: {type: Number, min: 1},
    simpleName: String,
    minInvestAmount: String,
    memberNum:{type: Number, min: 0},
    planColor: String,
    interestDownLimit:String,
    interestUpLimit:String,
    intRateDownLimit:String,
    intRateUpLimit:String,
    intRate:String,
    rate:String
});

module.exports = mongoose.model('Plans', PlansSchema, 'Plans');