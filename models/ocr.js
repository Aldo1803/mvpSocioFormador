const mongoose = require('mongoose');
const moment = require('moment');
moment().locale('es-MX');

const ocrSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: String,
        default: moment().format('DD-MM-YYYY, h:mm:ss a')
    }

});

module.exports = mongoose.model('Ocr', ocrSchema);
