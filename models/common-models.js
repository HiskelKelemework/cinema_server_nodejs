let mongoose = require('mongoose');

let rating_schema = new mongoose.Schema({
    value: {type: Number, default: 0},
    voters: {type: Number, default: 0}
}, { _id: false });

module.exports = {
    rating_schema: rating_schema
}