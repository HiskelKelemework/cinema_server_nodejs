import mongoose from 'mongoose';

let movie_schema = mongoose.Schema({
    title: { type: String, required: true },
    generes: { type: [String], required: true },
    duration: { type: Number, required: true },  // in minutes
    release_date: { type: Date, required: true },
    starring: { type: [String], required: true },  // renamed from cast: figured we won't be storing all the casts
    producer: { type: String, required: true },
    director: { type: String, required: true },
    author: { type: String, required: true },
    synopsis: { type: String, required: true },
    cover_image_url: { type: String, required: true },
    other_images_urls: [String],
    rating: {
        value: { type: Number, default: 0 },
        voters: { type: Number, default: 0 }
    },
    being_shown_in: [{
        type: mongoose.Schema.Types.ObjectId,  // cinema _id
        ref: 'Cinema'
    }]
    // trailer_url: String,
});

module.exports = mongoose.model('Movie', movie_schema);