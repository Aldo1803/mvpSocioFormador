const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authenticated');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const connectToDatabase = require('../db');




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
    const connection = await connectToDatabase();
    const sql = 'INSERT INTO log_table (token) VALUES (?)'

    User.find({ email: body.email }).then(userDB => {
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

        token = jwt.sign({
            data: userDB
        }, 'secret', { expiresIn: 60 * 60 * 24 * 30 });
        
        const values = [token];
        try {
            const result = connection.query(sql, values);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        } finally {
            connection.end();
        }



        res.json({
            userDB, token
        });
    }).catch(err => {
        return res.status(400).json({
            message: err
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

router.put('/user/:id', verifyToken, async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const user = new User({
        name: body.name || userDB.name,
        email: body.email || userDB.email,
        password: bcrypt.hashSync(body.password, 10) || userDB.password
    });

    User.findByIdAndUpdate(id, user).then(userDB => {
        
        res.json({
            userDB
        });

    }).catch(err => {
        return res.status(400).json({
            message: err
        });
    });

    

    

});










module.exports = router;