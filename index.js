const mongoose = require('mongoose');
const app = require('./app');
mongoose.Promise = global.Promise;
const port = 3000;

const uri = "mongodb+srv://AldoParada:0805@cluster0.bwsb0my.mongodb.net/?retryWrites=true&w=majority";
const localUri = "mongodb://localhost:27017/mvpSocio";
mongoose.connect(localUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('La conexión a la base de datos se ha realizado correctamente!!');

        // Crear servidor y ponerme a escuchar peticiones HTTP
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:' + port);
        });
    })
    .catch(err => console.log(err));