const mongoose = require('mongoose');
const moment = require('moment');
moment().locale('es-MX');

const resultSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: Object,
        required: true,
        trim: true
    },
    createdAt: {
        type: String,
        default: moment().format('DD-MM-YYYY, h:mm:ss a')
    }

});

module.exports = mongoose.model('Result', resultSchema);
