// Import the dependencies for testing
require('dotenv').config();
import chai, { assert } from 'chai';
import chaiHttp         from 'chai-http';
import server           from '../server';
import 'regenerator-runtime/runtime';

const APIRoutes = require('../api/routes');
import auth       from '../api/auth';
import connection from '../api/dbConnection';

// Configure chai
chai.use(chaiHttp);
chai.should();


const tUsername = process.env.TEST_USERNAME;
const tPassword = process.env.TEST_PASSWORD;

//basic server.js tests

describe('Server.js Checks', function () {
    
  it('should get the index file', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.headers["content-type"].should.include('text/html');
        done();
      });
  });

  it('should 404 appropriately', function (done) {
    chai.request(server)
      .get('/foo')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should have correct response headers', function (done) {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.header['x-content-type-options'].should.deep.equal('nosniff');
        res.header['x-xss-protection'].should.deep.equal('1; mode=block');
        res.header['x-powered-by'].should.deep.equal('PHP 7.4.3');
        done();
      });
  });
});


//api tests

describe('API Tests', function () {

  describe('API - dbConnection.js', function () {
    it('should establish a proper connection', (done) => {
      connection( async function (client) {
        let result = await client.db('tributes-inc').collection('users').findOne({username: tUsername});
        result.should.not.equal(null)
        result.username.should.equal(tUsername);
        done();
      });
    });
  });

  describe('API - auth.js', function () {
    // auth functions are to serialize/deserialize user and to set up local strategy.
    // not meaningfully testable outside of route testing
    it('should exist', function() {
      auth.should.exist;
    });
  });


  describe('API - routes.js', function (){
    describe('Log-in Tests', function() {
      // ensuring username / password are both filled out is handled client-side

      it('should log-in correctly', function (done) {
        chai.request(server)
          .post('/api/login')
          .type('form')
          .send({
            'username': tUsername,
            'password': tPassword
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.auth.should.deep.equal(true);
            res.body.msg.should.deep.equal(`${tUsername} has successfully signed in!`);
            res.body.username.should.deep.equal(tUsername);
            done();
          });
      });

      it("shouldn't log-in incorrectly, bad username", function (done) {
        chai.request(server)
          .post('/api/login')
          .type('form')
          .send({
            'username': 'wrongUsername5',
            'password': 'wrongPassword5'
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.auth.should.deep.equal(false);
            res.body.msg.should.deep.equal(`Incorrect username or password`);
            done();
          });
      });

      it("shouldn't log-in incorrectly, bad password", function (done) {
        chai.request(server)
          .post('/api/login')
          .type('form')
          .send({
            'username': tUsername,
            'password': 'wrongPassword5'
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.auth.should.deep.equal(false);
            res.body.msg.should.deep.equal(`Incorrect username or password`);
            done();
          });
      });
    });
    
    describe('Log-Out Tests', function () {
      it('should log-out and redirect', function (done) {
        chai.request(server)
          .get('/api/logout')
          .end((err, res) => {
            res.should.have.status(200);
            res.headers['content-type'].should.include('text/html');
            res.text.should.include('<title>Tributes Inc.</title>');
            done();
          });
      });
    });

    describe('Registration Tests', function () {
      it('should register a user correctly', function (done) {
        chai.request(server)
          .post('/api/register')
          .type('form')
          .send({
            'username': 'mochaTestUser',
            'password': 'mochaTestPass'
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.auth.should.deep.equal(true);
            res.body.msg.should.deep.equal(`Account created successfully!`);
            res.body.username.should.deep.equal(`mochaTestUser`);

            connection( async function (client) {
              let result = await client.db('tributes-inc').collection('users').deleteOne({username: 'mochaTestUser'});
              result.should.not.equal(null);
              result.deletedCount.should.equal(1);
              done();
            });
          });
      });

      it('should flag an already registered user', function (done) {
        chai.request(server)
          .post('/api/register')
          .type('form')
          .send({
            'username': tUsername,
            'password': tPassword
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.auth.should.deep.equal(false);
            res.body.msg.should.deep.equal(`Error, user already exists! Please pick a new name.`);
            done();
          });
      });
    });

  });
});
