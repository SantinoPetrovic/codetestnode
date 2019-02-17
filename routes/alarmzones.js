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

// Get specific alarm depending on which user you are logged in as and which site this alarm is linked to.
router.get('/getAlarmBySite', (req, res, next) => {
    const siteid = req.body.siteid;

	DB.serialize(function() {
    	DB.all("SELECT * FROM alarm_zones WHERE site_id = ?", [siteid], function(err, alarms) {
    		if (err) {
    			return res.json({success: false, msg: err});
    		} else {
    			if (alarms.length != 0) {
    				return res.json({success: true, alarms: alarms});
    			} else {
    				return res.json({success: false, msg: "Alarm zones not found."});
    			}
    		}
		});
	});		    
});

module.exports = router;