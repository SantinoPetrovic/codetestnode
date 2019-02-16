// Node modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

app.listen(port, function () {
  console.log('Server is running on port 3000.')
})
