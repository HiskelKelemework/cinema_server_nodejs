let mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    favorite: [{ // put a limit on how many items can be added in here
        item_id: { type: mongoose.Schema.Types.ObjectId, required: true },
        item_type: { type: String, enum: ['movie', 'cinema'], required: true }
    }]
});

module.exports = mongoose.model('User', user_schema);