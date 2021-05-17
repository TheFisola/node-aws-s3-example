const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 5555,
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,   
        s3bucketName: process.env.AWS_S3_BUCKET_NAME, 
        region: process.env.AWS_REGION
    }
}