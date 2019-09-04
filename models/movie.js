let mongoose = require('mongoose');

let rating_schema = require('./common-models').rating_schema;

const cinema_info_schema = new mongoose.Schema({
    // the _id will be the cinema _id
    name: { type: String, required: true },
    logo_image_url: { type: String, required: true },
    open_schedules: [{
        // the _id will be the schedules _id,
        date_and_time: { type: Date, required: true },
    }]
});

let movie_schema = mongoose.Schema({
    title: { type: String, required: true },
    generes: { type: [String], required: true },
    duration: { type: Number, required: true },  // in minutes
    number_of_views: { type: Number, default: 0 }, // how many people have seen it
    release_date: { type: Date, required: true },
    starring: { type: [String], required: true },
    producer: { type: String, required: true },
    director: { type: String, required: true },
    author: { type: String, required: true },
    synopsis: { type: String, required: true },
    cover_image_url: { type: String, required: true },
    other_images_urls: [String],
    being_shown_in: [cinema_info_schema],
    rating: { type: rating_schema, default: { value: 0, voters: 0 } },
    // trailer_url: String,  // probably link it to youtube
});

module.exports = mongoose.model('Movie', movie_schema);