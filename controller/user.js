const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authenticated');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const User = require('../models/user');
const bcrypt = require('bcrypt');




router.get('/test', async(req, res) => {
    res.status(200).send({
        message: 'Hola mundo desde el servidor de NodeJS'
    });
});


router.post('/register', async(req, res) => {
    const body = req.body;
    const user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    try {
        const userDB = await user.save();
        res.json({
            userDB
        });
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }


});

router.post('/login', async(req, res) => {
    const body = req.body;

    User.find({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                message: err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                message: 'Usuario o contraseña incorrectos'
            });
        }

        if (!bcrypt.compareSync(body.password, userDB[0].password)) {
            return res.status(400).json({
                message: 'Usuario o contraseña incorrectos'
            });
        }

        res.json({
            userDB
        });
    });




});

router.get('/user', verifyToken, async(req, res) => {
    const id = req.params.id;

    User.findById(id, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                message: err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                message: 'Usuario no encontrado'
            });
        }

        res.json({
            userDB
        });
    });



});










module.exports = router;