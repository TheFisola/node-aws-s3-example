const express = require('express');
const config = require('./config');
const multer = require('multer');
const AWS = require('aws-sdk');
const uuid = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, '');
  },
});

const upload = multer({ storage });

const app = express();

app.listen(config.port, () => console.log(`App is running on ${config.port}`));

const uploadImage = async (req, res) => {
  const fileArray = req.file.originalname.split('.');
  const fileType = fileArray[fileArray.length - 1];
  const objectKey = `aws-image-upload-example-${uuid()}.${fileType}`;
  const imagePath = `https://${config.aws.s3bucketName}.s3.amazonaws.com/${objectKey}`;

  const params = {
    Bucket: config.aws.s3bucketName,
    Key: objectKey,
    Body: req.file.buffer,
    ACL: 'public-read',
    ContentType: req.file.mimetype,
  };
  try {
    await s3.upload(params).promise();
  } catch (error) {
    console.log('upload error: ', err);
    res
      .status(500)
      .json({
        status: false,
        message: 'Error occurred trying to upload image',
      });
  }

  res.status(200).json({
    status: true,
    message: 'Image successfully uploaded',
    imagePath,
  });
};

app.get('/health', (req, res) => res.send({ status: 'Ok' }));

app.post('/upload', upload.single('file'), uploadImage);

module.exports = app;
