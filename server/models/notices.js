var mongoose=require('../common/lib/mongdbUtils.js');
var Schema = mongoose.Schema;

var NoticesSchema = new Schema({
    name: String,
    staticLink: String
});

module.exports = mongoose.model('Notices', NoticesSchema, 'Notices');