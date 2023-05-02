const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// cargar rutas

const userRoutes = require('./controller/user');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// rutas
app.use('/api', userRoutes);

// exportar
module.exports = app;

