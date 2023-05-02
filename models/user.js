const mongoose = require('mongoose');
const moment = require('moment');
moment().locale('es-MX');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: String,
        default: moment().format('DD-MM-YYYY, h:mm:ss a')
    }
  
});

module.exports = mongoose.model('User', userSchema);

