
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectID;

function auth (app, myDataBase) {

  //Passport user init
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    myDataBase.findOne({"_id": new ObjectID(id)}, (err, doc) => {
      if (err) return err;
      done(null, doc);
    });
  });

  //Passport strategy setup
  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log("checking...");
      myDataBase.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!bcrypt.compareSync(password, user.password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

}

module.exports = auth;
