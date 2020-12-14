
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
const URI          = process.env.CONNECTION_STRING;
const store        = new MongoStore({ url: URI });
const routes       = require('./api/routes')
const auth         = require('./api/auth');

//const expect     = require('chai');
const currentTimeEST = () => Date().toLocaleString('en-US', { timeZone: 'EST'}) + ' EST';

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

// public folders
app.use('/scripts', express.static(process.cwd() + '/scripts'));
app.use('/styles', express.static(process.cwd() + '/styles'));
app.use('/img', express.static(process.cwd() + '/img'));

// passport and associated config
app.use(session({ 
  secret: "don johnson",
  resave: true,
  key: 'express.sid',
  store: store,
  saveUninitialized: true,
  cookie: { 
    secure: true,
    maxAge: 1800000
  }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

routes(app, myDB);
auth(app, myDB);


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
