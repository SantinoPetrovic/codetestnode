// Node modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const sqlite3 = require('sqlite3');

// Getting config
const config = require('./config/database');

// "Booting" up DB
const DB = new sqlite3.Database(config.dbpath, function(err){
    if (err) {
        return err;
    }
});

// Getting routes
const users = require('./routes/users');
const sites = require('./routes/sites');

const app = express();

const port = 3000;

app.use(cors());

app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function (req, res) {
    res.send('Invalid Endpoint.');
})

app.use('/users', users);
app.use('/sites', sites);

app.listen(port, function () {
    console.log('Server is running on port 3000.');	  
})
