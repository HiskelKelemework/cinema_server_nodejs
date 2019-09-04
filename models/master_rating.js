let mongoose = require('mongoose');

const master_rating_schema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    item_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    item_type: { type: String, enum: ['movie', 'cinema'], required: true },
    value: { type: Number, required: true }, // maybe the user wants to re-rate
    time: { type: Date, default: new Date() }
}, { _id: false });

module.exports = mongoose.model('Rating', master_rating_schema);