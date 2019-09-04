let mongoose = require('mongoose');
let Cinema = require('../models/cinema');


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
    console.log('connected to test db');
    // await addCinema();
    db.close();
});

async function addCinema() {
    let cinema = new Cinema({
        name: 'Alem Cinema',  // renamed from title
        // halls: [hall_schema],
        // showing: [movie_info_schema],
        // schedules: [schedule_schema],
        // rating: rating_schema,
        contact_info: {
            phone: '0987654321',
            email: 'test@test.com',
            address: 'Bole mender',
            location: { type: 'Point', coordinates: [-104.9903, 39.7392]},  // point_schema created as:: {type: 'Point', coordinates: [-104.9903, 39.7392]}, longitude first!!
            logo_image_url: 'dummy_log_image_url',
            cover_image_url: 'dummy_cover_image_url',
        },
        about: 'Haile\'s wife owns it',
    });

    const halls = [[55, 7], [40, 10]];
    halls.forEach((each) => {
        cinema.halls.push({
            name: 'hall name',
            normal_seats: each[0],
            vip_seats: each[1],
        });
    });
    try {
        await cinema.save();
        console.log('added successfully');
    } catch (err) {
        console.log(err);
    }
}

