import mongoose from 'mongoose';

// a geographical coordinate schema
const point_schema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
});

// a single schedule's schema
const schedule_schema = mongoose.Schema({
  date: {type: String, required: true},
  time: {type: String, required: true},
  
});

// cinema halls
const hall_schema = mongoose.Schema({
  normal_seats: {type: Number, required: true},
  vip_seats: {type: Number, required: true},
  screen_type: {type: String}
});

const cinema_schema = mongoose.Schema({
    name: {type: String, required: true},  // renamed from title
    logo_image_url: {type: String, required: true},
    cover_image_url: {type: String, required: true},
    contact_info: {
        phone: {type: String, required: true},
        email: {type: String, required: true},
        address: {type: String, required: true},
        location: {point_schema, required: true},  // point_schema created as:: {type: 'Point', coordinates: [-104.9903, 39.7392]}
    },
    halls: [hall_schema],
    schedules: [schedule_schema]

});

module.exports = mongoose.model('Cinema', cinema_schema);