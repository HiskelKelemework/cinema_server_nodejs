let mongoose = require('mongoose')

let rating_schema = require('./common-models').rating_schema;

// a geographical coordinate schema
const point_schema = mongoose.Schema({
  type: { type: String, enum: ['Point'], required: true },
  coordinates: { type: [Number], required: true }
}, { _id: false });

const movie_info_schema = mongoose.Schema({
  name: { type: String, required: true },
  cover_image_url: { type: String, required: true },
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

const hall_schema = mongoose.Schema({
  name: { type: String, required: true },
  normal_seats: { type: Number, required: true },
  vip_seats: { type: Number, required: true },
  screen_type: { type: String, default: '2D' },
});

const schedule_schema = mongoose.Schema({
  date_and_time: { type: Date, required: true },
  hall: { type: mongoose.Schema.Types.ObjectId, required: true},
  movie_info: { type: movie_info_schema, required: true },
  price: { type: price_schema, required: true },
  reserved_seats: { type: reserved_seats_schema, required: true },
  closed: { type: Boolean, default: false }
});

const contact_info_schema = mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: point_schema, required: true },  // point_schema created as:: {type: 'Point', coordinates: [-104.9903, 39.7392]}, longitude first!!
  logo_image_url: { type: String, required: true },
  cover_image_url: { type: String, required: true },
}, { _id: false });

const cinema_schema = mongoose.Schema({
  name: { type: String, required: true },  // renamed from title
  halls: [hall_schema],
  showing: [movie_info_schema],
  schedules: [schedule_schema],
  rating: { type: rating_schema, default: {value: 0, voters: 0} },
  contact_info: { type: contact_info_schema, required: true },
  about: { type: String, required: true },
});

module.exports = mongoose.model('Cinema', cinema_schema);