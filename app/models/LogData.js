var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogDataSchema = new Schema({
    createdDate: Date,
    entityId: Number,
    entityType: String,
    body: Object
});

module.exports = mongoose.model('LogData', LogDataSchema);