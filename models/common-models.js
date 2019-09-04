let mongoose = require('mongoose');

let rating_schema = new mongoose.Schema({
    value: { type: Number, default: 0 },
    voters: { type: Number, default: 0 }
}, { _id: false });

const movie_info_schema = mongoose.Schema({
    name: { type: String, required: true },
    cover_image_url: { type: String, required: true },
    rating: { type: Number, required: true },
    id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Movie' }
}, { _id: false });

const price_schema = mongoose.Schema({
    normal: { type: Number, required: true },
    vip: { type: Number, required: true },
}, {_id: false});
  
const reserved_seats_schema = mongoose.Schema({
    normal: { type: Number, default: 0 },
    vip: { type: Number, default: 0 },
}, {_id: false});

let ticket_schema = mongoose.Schema({
    code: { type: String, required: true },
    number_of_people: {type: String, required: true },
    amount_paid: { type: Number, required: true },

    // book keeping - ma mn aderege
    used: { type: Boolean, default: false },
    made_void_by: mongoose.Schema.Types.ObjectId, // if used, who scanned it, cinema admin..
    made_void_at: Date // if used, when ?
});

const schedule_schema = mongoose.Schema({
    cinema_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cinema' },
    date_and_time: { type: Date, required: true },
    hall: { type: mongoose.Schema.Types.ObjectId, required: true},
    movie_info: { type: movie_info_schema, required: true },
    price: { type: price_schema, required: true },
    reserved_seats: { type: reserved_seats_schema, default: { normal: 0, vip: 0} },
    sold_tickets: [ticket_schema],
    closed: { type: Boolean, default: false },
    active: { type: Boolean, default: false } // protection for editing or deleting schedule, once active can't edit
});

module.exports = {
    rating_schema,
    movie_info_schema,
    schedule_schema
}