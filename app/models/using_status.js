var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsingStatusSchema = new Schema({
  flag: { type: Boolean, require: true},
  date: { type: Date}
});

module.exports = mongoose.model('Using_Status', UsingStatusSchema);
