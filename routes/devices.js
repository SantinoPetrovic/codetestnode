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

// Get specific device depending on which site this device is linked to.
router.get('/getDeviceBySite', (req, res, next) => {
    const siteid = req.body.siteid;

	DB.serialize(function() {
    	DB.all("SELECT * FROM devices WHERE site_id = ? ", [siteid], function(err, devices) {
    		if (err) {
    			return res.json({success: false, msg: err});
    		} else {
    			if (devices.length != 0) {
    				return res.json({success: true, devices: devices});
    			} else {
    				return res.json({success: false, msg: "Device not found."});
    			}
    		}
		});
	});		    
});

module.exports = router;