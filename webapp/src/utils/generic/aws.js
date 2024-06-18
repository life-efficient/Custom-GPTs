const AWS = require('aws-sdk');
const fs = require('fs');
const s3 = new AWS.S3();

export const uploadToS3 = (fileName, outputPath=fileName, bucketName) => {
    const fileContent = fs.readFileSync(fileName);

    const params = {
        Bucket: bucketName,
        Key: outputPath,
        Body: fileContent,
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error uploading file:', err);
            reject(err);
        } else {
            console.log(`File uploaded successfully. ${data.Location}`);
            resolve(data.Location);
        }
        });
    });
};