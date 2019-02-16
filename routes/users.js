// Node modules
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

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
    	DB.all("SELECT * FROM users", function(err, rows) {
    		if (err) {
    			return res.json({success: false, msg: err});
    		} else {
    			return res.json({success: true, users: rows});
    		}
		});
	});		    
});

module.exports = router;