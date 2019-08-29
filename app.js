const express = require('express');
let mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;


mongoose.connect('mongodb+srv://atlas_admin_1:ATLAS@admin1@123@cluster0-emqje.mongodb.net/test?retryWrites=true&w=majority',
{useNewUrlParser: true});

var db = mongoose.connection;
var connected = false;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to test db');
    connected = true;
    // dummy();
});

const Info = mongoose.model('Info', mongoose.Schema({
    name: String,
    age: Number
}));
app.use((req, res, next) => {
    if (!connected) res.json({success: false, message: 'no db connection'});
    else next();
});

app.get('/', (req, res) => {
    Info.find({}).lean().exec((err, result) => {
        if (err) res.json({success: false, message: 'something went wrong'});
        else if (!result || result.length === 0) res.json({success: false, message: 'no items found'});
        else res.json({success: true, data: result});
    });
});

app.get('/time', (req, res) => {
    res.json({date: new Date()});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))