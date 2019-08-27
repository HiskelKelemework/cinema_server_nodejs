let mongoose = require('mongoose');

mongoose.connect('mongodb+srv://atlas_admin_1:ATLAS@admin1@123@cluster0-emqje.mongodb.net/test?retryWrites=true&w=majority',
{useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to test db');
    // dummy();
});

function dummy() {
    let info = mongoose.Schema({
        name: String,
        age: Number,
    });
    
    let Info = mongoose.model('Info', info);
    for (let j=0; j < 50; j++) {
        const i = new Info({
            name: `Hiskel Kelemework_${j}`,
            age: 22 + j
        });
    
        i.save((err, result) => {
            if (err) console.log('something went wrong');
            else console.log(result);
        });
    } 
}


