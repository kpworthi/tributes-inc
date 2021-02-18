// Import the dependencies for testing
import chai from 'chai';
const { assert } = chai;
import chaiHttp         from 'chai-http';
import server           from '../server.js';

//const APIRoutes = require('../api/routes');
import auth       from '../api/auth.js';
import connection from '../api/dbConnection.js';

// Configure chai
chai.use(chaiHttp);
chai.should();


const tUsername = process.env.TEST_USERNAME;
const tPassword = process.env.TEST_PASSWORD;


describe('Test Opt: Silence server logs', function () {
  it('should silence server logging', function () {
    console.log = function () {
      return null;
    }
    console.log.should.be.a('function');
  });
})

//basic server.js tests

describe('Test Cat: Server.js Checks', function () {
    
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

describe('Test Cat: API Tests', function () {

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

  //API Auth 
  //passport.serializeUser
  //passport.deserializeUser
  //passport.use(LocalStrategy)
  describe('API - auth.js', function () {
    // auth functions are to serialize/deserialize user and to set up local strategy.
    // not meaningfully testable outside of route testing
    it('should exist', function() {
      auth.should.exist;
    });
  });

  //API Routes
  // api/tribute  - POST
  // api/login    - GET, POST
  // api/logout   - GET
  // api/register - POST
  // api/design   - POST, PUT, DELETE
  // api/list     - POST
  // api/admin    - POST, DELETE (optional)
  describe('Test Cat: API - routes.js', function (){
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

    describe('Template Tests', function () {

      describe('Template Creation', function () {
        it('should create a Bio Template appropriately', function (done) {
          chai.request(server)
            .post('/api/design')
            .type('form')
            .send({
              "name"       : "Bio Test",
              "tagline"    : `Bio Test's sub-title`,    "img"        : './img/test-house.jpg',
              "caption"    : `Bio Test's caption`,      "quote"      : `Bio Test's quote`,
              "author"     : `Bio Test's quote author`, "palette"    : 'classic',
              "bio"        : `Bio Test's biography is nothing particularly exciting to behold, however we did not want them forgotten\nHere is a little bit of extra text to help make sure that the entry is not too barren. We hope that you can appreciate their life as much as others in the world have.`,
              "visible"    : true, "link"       : `https://en.wikipedia.org/wiki/${"Bio Test".split(' ').join('_')}`,
              "type"       : 'TemplateA',
              "username"   : 'Mocha'
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.text.should.equal('Success! Tribute saved.');
              done();
            });
        });
        it('cannot create a duplicate tribute', function (done) {
          chai.request(server)
            .post('/api/design')
            .type('form')
            .send({
              "name"       : "Bio Test",            "img"        : './img/test-house.jpg',
              "caption"    : `Bio Test's caption`,  "palette"    : 'classic',
              "bio"        : `Bio Test's biography is nothing particularly exciting to behold, however we did not want them forgotten\nHere is a little bit of extra text to help make sure that the entry is not too barren. We hope that you can appreciate their life as much as others in the world have.`,
              "link"       : `https://en.wikipedia.org/wiki/${"Bio Test".split(' ').join('_')}`,
              "type"       : 'TemplateA', "username"   : 'Mocha'
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.text.should.equal('A tribute for this person already exists...');
              done();
            });
        });
        it('should create a Timeline Template appropriately', function (done) {
          chai.request(server)
            .post('/api/design')
            .type('form')
            .send({
              "name"       : "Template Test",
              "tagline"    : `Template Test's sub-title`,    "img"        : './img/test-house.jpg',
              "caption"    : `Template Test's caption`,      "quote"      : `Template Test's quote`,
              "author"     : `Template Test's quote author`, "palette"    : 'warm',
              "year1": '2000', "event1": `Template Test was born`, "year2": '2017', "event2": `Template Test started their secondary education`,
              "year3": '2021', "event3": `Template Test's timeline was created`,
              "link"       : `https://en.wikipedia.org/wiki/${"Template Test".split(' ').join('_')}`,
              "type"       : 'TemplateB', "username"   : 'Mocha'
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.text.should.equal('Success! Tribute saved.');
              done();
            });
        });
        it("won't create a third tribute", function (done) {
          chai.request(server)
            .post('/api/design')
            .type('form')
            .send({
              "name"       : "Timeline Test",
              "tagline"    : `Timeline Test's sub-title`,    "img"        : './img/test-house.jpg',
              "caption"    : `Timeline Test's caption`,      "quote"      : `Timeline Test's quote`,
              "author"     : `Timeline Test's quote author`, "palette"    : 'warm',
              "year1": '2000', "event1": `Timeline Test was born`, "year2": '2017', "event2": `Timeline Test started their secondary education`,
              "year3": '2021', "event3": `Timeline Test's timeline was created`,
              "link"       : `https://en.wikipedia.org/wiki/${"Timeline Test".split(' ').join('_')}`,
              "type"       : 'TemplateB', "username"   : 'Mocha'
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.text.should.equal("You already have two free tribute pages.");
              done();
            });
        });
      });

      describe('Template editing', function () {
        it('should hide templates appropriately', function (done) {
          chai.request(server)
            .put('/api/design')
            .send({ 
              username: "Mocha", 
              name: "Bio Test", 
              editType: "hide"
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.text.should.equal(`Tribute successfully updated.`);

              connection( async function (client) {
                let result = await client.db('tributes-inc').collection('tributes').findOne({"name": 'Bio Test'});
                result.should.not.equal(null);
                result.visible.should.equal(false);
                done();
              });
            });
        });
        it('will show a tribute again when requested', function (done) {
          chai.request(server)
            .put('/api/design')
            .send({ 
              username: "Mocha", 
              name: "Bio Test", 
              editType: "show"
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.text.should.equal(`Tribute successfully updated.`);

              connection( async function (client) {
                let result = await client.db('tributes-inc').collection('tributes').findOne({"name": 'Bio Test'});
                result.should.not.equal(null);
                result.visible.should.equal(true);
                done();
              });
            });
        });
        it('will make textual changes', function (done) {
          chai.request(server)
            .put('/api/design')
            .send({ 
              "name"       : "Template Test",
              "tagline"    : `Template Test's sub-title`,    "img"        : './img/test-house.jpg',
              "caption"    : `A new caption!`,      "quote"      : `Template Test's quote`,
              "author"     : `Template Test's quote author`, "palette"    : 'warm',
              "year1": '2000', "event1": `Template Test was born`, "year2": '2017', "event2": `Template Test started their secondary education`,
              "year3": '2021', "event3": `Template Test's timeline was created`,
              "link"       : `https://en.wikipedia.org/wiki/${"Template Test".split(' ').join('_')}`,
              "type"       : 'TemplateB', "username"   : 'Mocha'
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.text.should.equal(`Tribute successfully updated.`);

              connection( async function (client) {
                let result = await client.db('tributes-inc').collection('tributes').findOne({"name": 'Template Test'});
                result.should.not.equal(null);
                result.caption.should.equal("A new caption!");
                done();
              });
            });
        });
      });

      describe('Template Deletion', function () {
        it('should delete the first template correctly', function (done) {
          chai.request(server)
            .delete('/api/design')
            .send({
              username: 'Mocha', 
              name: 'Bio Test',
              editType: 'delete'
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.text.should.equal('Tribute successfully deleted.')
              done();
            });
        });
        it('should delete the second template correctly', function (done) {
          chai.request(server)
            .delete('/api/design')
            .send({
              username: 'Mocha', 
              name: 'Template Test',
              editType: 'delete'
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.text.should.equal('Tribute successfully deleted.')
              done();
            });
        });
      });
    });

  });
});
