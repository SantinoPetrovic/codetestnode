// Node modules
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');

// Getting config
const config = require('../config/database');

// "Booting" up DB
const DB = new sqlite3.Database(config.dbpath, function(err){
    if (err) {
        return err;
    }
});

// Get all users and send return data
router.get('/getUsers', (req, res, next) => {
    DB.serialize(function() {
        DB.all("SELECT * FROM users", function(err, users) {
            if (err) {
                return res.json({success: false, msg: err});
            } else {
                return res.json({success: true, users: users});
            }
        });
    });         
});

// Login route
router.get('/login', (req, res, next) => {
    const userid = req.body.userid;

    DB.serialize(function() {
        DB.all("SELECT * FROM users WHERE id = ?", [userid], function(err, user) {
            if (err) {
                return res.json({success: false, msg: err});
            } else {
                if (user.length != 0) {
                    return res.json({success: true, user: user});
                } else {
                    return res.json({success: false, msg: "User not found."});
                }
            }
        });
    });
});

// Tokenize user and return it to client
router.post('/tokenize', (req, res, next) => {
    const user = req.body;
    const token = jwt.sign(user, config.secret, {
        expiresIn: 604800 // 1 week
    });

    res.json({success: true, token: 'JWT '+token, user: user});    

});

module.exports = router;