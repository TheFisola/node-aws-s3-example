const express = require('express');
const config = require('./config');
const multer = require('multer');
const upload = multer({
  dest: 'images',
});
const app = express();

app.listen(config.port, () => console.log(`App is running on ${config.port}`));


const uploadImage = (req, res) => {
    console.log(req.file);
    res.json({
        status: true,
        message: 'Image Uploaded Successfully'
    });
};

app.get('/health', (req, res) => res.send({status: 'Ok'}));

app.post('/upload', upload.single('file'), uploadImage);


module.exports = app