const config = require('../config')
const fs = require('fs');
const AWS = require('aws-sdk');

const uploadFile = async (fileName, filePath, type) => {
    return new Promise((resolve, reject) => {
        const s3 = new AWS.S3({
            accessKeyId: config.awsAccesskeyID,
            secretAccessKey: config.awsSecretAccessKey
        });

        let contentType = type;



        fs.readFile(filePath, (err, data) => {
            if (err) throw err;

            const params = {
                Bucket: 'serendev-finances',
                Key: fileName,
                Body: data,
                ContentType: contentType

            };

            s3.upload(params, function (s3Err, data) {
                if (s3Err) throw s3Err

                resolve(data.Location);

            });
        });
    });
};

module.exports = { uploadFile }