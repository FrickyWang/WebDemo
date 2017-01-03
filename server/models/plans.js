var mongoose=require('../common/lib/mongdbUtils.js');
var Schema = mongoose.Schema;

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
    rate:String,
    starPlan:Boolean
});

module.exports = mongoose.model('Plans', PlansSchema, 'Plans');