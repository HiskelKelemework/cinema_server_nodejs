let mongoose = require('mongoose')

let { rating_schema, schedule_schema, movie_info_schema } = require('./common-models');

// a geographical coordinate schema
const point_schema = mongoose.Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], required: true }
}, { _id: false });

const hall_schema = mongoose.Schema({
  name: { type: String, required: true },
  normal_seats: { type: Number, required: true },
  vip_seats: { type: Number, required: true },
  screen_type: { type: String, default: '2D' },
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
  name: { type: String, required: true },
  active: { type: Boolean, default: false }, // account activation and deactivation
  halls: [hall_schema],
  showing: [movie_info_schema],
  schedules: [schedule_schema], // only active and open schedules stored in here
  rating: { type: rating_schema, default: {value: 0, voters: 0} },
  contact_info: { type: contact_info_schema, required: true },
  about: { type: String, required: true },
});

module.exports = mongoose.model('Cinema', cinema_schema);