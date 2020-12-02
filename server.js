
"use strict";
require('dotenv').config();
const express    = require('express');
const myDB       = require('./api/dbConnection');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const passport   = require('passport');
const session    = require('express-session');

const app          = express();
const server       = require('http').createServer(app);
const cookieParser = require('cookie-parser');
const MongoStore   = require('connect-mongo')(session);
const URI          = process.env.MONGO_URI;
const store        = new MongoStore({ url: URI });

//const expect     = require('chai');

// helmet and other custom headers
app.use(helmet());
app.use(function (req, res, next){
  res.set({
    //'surrogate-control': 'no-store',
    //'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    //'pragma': 'no-cache',
    'expires': '0',
    'x-powered-by': 'PHP 7.4.3'
  });
  next();
});

// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// public folders
app.use('/scripts', express.static(process.cwd() + '/scripts'));
app.use('/styles', express.static(process.cwd() + '/styles'));
app.use('/img', express.static(process.cwd() + '/img'));

// index page
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// Set up server to listen on 443
const portNum = process.env.PORT;
server.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});