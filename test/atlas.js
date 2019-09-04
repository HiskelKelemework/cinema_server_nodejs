let mongoose = require('mongoose');
let Movie = require('../models/movie');
let rating_schema = require('../models/common-models');

mongoose.connect('mongodb+srv://atlas_admin_1:ATLAS@admin1@123@cluster0-emqje.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
    console.log('connected to test db');
    // await create_movie();
    await rate_movie();
    db.close();
});

async function create_movie() {
    const movie = Movie({
        title: 'Tizitah',
        generes: ['Romance', 'Drama', 'Thriller'],
        duration: 95,  // in minutes
        release_date: new Date(2013, 2, 5),
        starring: ['Girum Ermias', 'Abebe Deboch', 'Chala Chuka'],
        producer: 'Dinku Producer',
        director: 'Andegna Director',
        author: 'Fuayalew Tsehafi',
        synopsis: '1 Astemari Geter Hedo fua yalech chick yiwedal, keza timotalech',
        cover_image_url: 'begizew photo alneberem',
        rating: { type: rating_schema, default: { value: 0, voters: 0 } },
    });
    try {
        const result = await movie.save();
        console.log(result);
    } catch (err) {
        console.log('something went wrong');
        console.log(err);
    }
}

async function rate_movie() {
    const user_id = '5d68e1321104151512f2758b';
    for (let i = 0; i < 128; i++) {
    const rating = Math.floor(Math.random() * 5);
        try {
            await Movie.updateOne({ _id: "5d68e1321104151512f2758b" }, 
                { $push: { rated_by: { user_id} } });

        } catch (err) {
            console.log('something went wrong');
        } 
    }
}


