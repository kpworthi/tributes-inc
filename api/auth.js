
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectID;
const currentTimeEST = () => Date().toLocaleString('en-US', { timeZone: 'EST'}) + ' EST';

function auth (app, database) {

  //Passport user init
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    database( async function (client) {
      let result = await client.db('tributes-inc').collection('users').findOne({"_id": new ObjectID(id)});
      if ( !result ) {
        console.log('DB search for id from cookie came back negative. ' + currentTimeEST());
        done('no match found for cookie found');
      }
      else done(null, result);
    });
  });

  //Passport strategy setup
  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log("checking username and password");
      database(async function (client) {
        let result = await client.db('tributes-inc').collection('users').findOne({ username: username })
        if ( result === null ) { return done(null, false); }
        if (!bcrypt.compareSync(password, result.password)) { return done(null, false); }

        result.last_login = currentTimeEST();
        let updateResult = await client.db('tributes-inc').collection('users')
                                  .updateOne({ username: username }, {$set: { last_login: result.last_login }});
        return done(null, result);
      });
    }
  ));

}

module.exports = auth;
