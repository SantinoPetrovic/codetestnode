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

// Get specific sites depending on which user you are logged in as (post are needed so we can get requests from client).
router.post('/', (req, res, next) => {
    const userid = req.body.id;
    
    DB.serialize(function() {
        DB.all("SELECT * FROM sites WHERE user_id = ?", [userid], function(err, sites) {
            if (err) {
                return res.json({success: false, msg: err});
            } else {
                if (sites.length != 0) {
                    return res.json({success: true, sites: sites});
                } else {
                    return res.json({success: false, msg: "Sites not found."});
                }
            }
        });
    });         
});


// Get specific alarm zones depending on which device site your client is on.
router.get('/:siteid/alarmZones', (req, res, next) => {
    const siteid = req.params.siteid;
    DB.serialize(function() {
        DB.all("SELECT * FROM alarm_zones WHERE site_id = ?", [siteid], function(err, alarms) {
            if (err) {
                return res.json({success: false, msg: err});
            } else {
                if (alarms.length != 0) {
                    return res.json({success: true, isNotEmpty: true, alarms: alarms});
                } else {
                    return res.json({success: true, isNotEmpty: false, alarms: []});
                }
            }
        });
    });         
});

// Get specific devices depending on which device site your client is on.
router.get('/:siteid/devices', (req, res, next) => {
    const siteid = req.params.siteid;
    DB.serialize(function() {
        DB.all("SELECT * FROM devices WHERE site_id = ?", [siteid], function(err, devices) {
            if (err) {
                return res.json({success: false, msg: err});
            } else {
                if (devices.length != 0) {
                    return res.json({success: true, isNotEmpty: true, devices: devices});
                } else {
                    return res.json({success: true, isNotEmpty: false, devices: []});
                }
            }
        });
    });         
});

router.get('/:storageid/storages', (req, res, next) => {
    const storageid = req.params.storageid;
    DB.serialize(function() {
        DB.all("SELECT a.state as state, b.type as type FROM storages a INNER JOIN storage_types b ON a.type_id = b.id WHERE a.device_id = ?", [storageid], function(err, storages) {
            if (err) {
                return res.json({success: false, msg: err});
            } else {
                if (storages.length != 0) {
                    return res.json({success: true, isNotEmpty: true, storages: storages});
                } else {
                    return res.json({success: true, isNotEmpty: false, storages: []});
                }
            }
        });
    });         
});


module.exports = router;