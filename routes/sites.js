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

// Get specific sites depending on which user you are logged in as.
router.post('/getSitesForUser', (req, res, next) => {
	const userid = req.body.userid;

	DB.serialize(function() {
    	DB.all("SELECT * FROM sites WHERE user_id = ?", [userid], function(err, sites) {
    		if (err) {
    			return res.json({success: false, msg: err});
    		} else {
    			if (sites.length != 0) {
    				return res.json({success: true, sites: sites});
    			} else {
    				return res.json({success: false, msg: "User not found."});
    			}
    		}
		});
	});		    
});

module.exports = router;