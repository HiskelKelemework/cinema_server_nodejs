let mongoose = require('mongoose');
let schedule_schema = require('./common-models').schedule_schema;


module.exports = mongoose.model('MovieSchedule', schedule_schema);