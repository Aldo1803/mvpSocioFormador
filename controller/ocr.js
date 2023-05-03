const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authenticated');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const OCR = require('../models/ocr');
const textract = require('../services/textract-service');
const aws = require('aws-sdk');
const imgUploader = require('../services/imgUploader');
const config = require('../config');

const fs = require('fs');

aws.config.update({
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey,
    region: config.awsRegion
});


router.post('/upload', verifyToken, upload.array('file'), async (req, res) => {
    const file = req.file;
    const body = req.body;
    const ocr = new OCR();

    if (req.files) {
        const file = req.files[0];
        console.log(file);

        const fileName = file.originalname;
        const filePath = file.path;
        let mime = file.mimetype;
        let ext = mime.split("/")[1];
        console.log(fileName, filePath, mime, ext);


        const img = await imgUploader.uploadFile(fileName, filePath, mime);
        console.log(img);
        ocr.img = img;
        ocr.name = fileName;
        fs.rmSync(filePath);

    }

    try {
        const ocrDB = await ocr.save();

        res.status(200).json({ ocrDB });
    } catch (error) {

        res.status(500).json(error);
    }
    
});

router.get('/ocr', verifyToken, async (req, res) => {
    const ocr = await OCR.find();
    res.status(200).json({ ocr });
});

router.get('/ocr/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const ocr = await OCR.findById(id);
    res.status(200).json({ ocr });
});

router.post('/analyze', verifyToken, async (req, res) => {

    const s3 = new aws.S3();

    const body = req.body;
    const name = body.name;

    const params = {
        Bucket: 'serendev-finances',
        Key: name,
        
    };


    

    s3.getObject(params, async (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ err });
        }
        console.log(data);
        const text = await textract(data.Body);
        console.log(text);
        res.status(200).json({ text });
    });



    

});






module.exports = router;