require('dotenv').config();
const express    = require('express');
const bodyParser = require('body-parser');
const expect     = require('chai');
const helmet     = require('helmet');


const app    = express();
const server = require('http').createServer(app);


// helmet and other security headers
app.use(helmet());
app.use(function (req, res, next){
  res.set({
    'surrogate-control': 'no-store',
    'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'pragma': 'no-cache',
    'expires': '0',
    'x-powered-by': 'PHP 7.4.3'
  });
  next();
});

// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// public folder
app.use('/scripts', express.static(process.cwd() + '/scripts'));
app.use('/styles', express.static(process.cwd() + '/styles'));

// index page
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

// Set up server to listen on 443
const portNum = 443;
server.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});