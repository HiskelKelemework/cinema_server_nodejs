const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// let mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoose.connect('mongodb+srv://atlas_admin_1:ATLAS@admin1@123@cluster0-emqje.mongodb.net/test?retryWrites=true&w=majority',
// {useNewUrlParser: true});

// var db = mongoose.connection;
// var connected = false;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('connected to test db');
//     connected = true;
//     // dummy();
// });
// const movie_router = require('./routes/movie-router');

// app.use('/movies', movie_router);
app.get('/', (req, res) => {
    res.json({dir: __dirname});
});

app.get('/model', (req, res) => {
    res.sendFile(path.join(__dirname, 'models', 'movie.js'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`))