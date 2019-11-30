const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const formidable = require('formidable');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 1024 } });


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const atlas_mongo_uri = 'mongodb+srv://atlas_admin_1:ATLAS@admin1@123@cluster0-emqje.mongodb.net/test?retryWrites=true&w=majority';
const local_mongo_uri = 'mongodb://localhost:27017/test';

mongoose.connect(local_mongo_uri, { useNewUrlParser: true });

app.get('/', (req, res) => {
    res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data"> 
        Select image to upload: 
        <input type="file" name="file"> 
        <input type="submit" value="Upload Image" name="submit"> 
    </form>`
    );
});


app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
        res.send('must upload file');
    }

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'filesBucket'
    });

    const read_stream = fs.createReadStream(req.file.path);

    read_stream.pipe(gridfsbucket.openUploadStream(file.originalname)).
        on('error', function (error) {
            res.send('could not upload file');
            read_stream.close();
            delete_temp_file(req.file.path);
        }).
        on('finish', function (response) {
            console.log(response);
            res.send('file uploaded');
            read_stream.close();
            delete_temp_file(req.file.path);
        });
});

function delete_temp_file(path) {
    fs.unlink(path, (err) => {
        if (err) console.log(`could not remove temp file at ${path}`);
        else console.log('deleted temp file');
    });
}

app.use((err, req, res, next) => {
    console.log('error forwarded');
    console.log(err);
    res.end('an error occured');
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(db.listeners.length);
    console.log('connected to test db');
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`app listening on port ${port}!`));
});