
const passport = require("passport");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const currentTimeEST = () =>
  new Date().toLocaleString("en-US", { timeZone: "EST" }) + " EST";

function routes(app, database) {
  class User {
    constructor(username, password) {
      this.username       = username;
      this.username_lower = username.toLowerCase();
      this.password       = password;
      this.created_on     = currentTimeEST();
      this.last_login     = currentTimeEST();
      this.realname_first = "Not specified";
      this.realname_last  = "Not specified";
      this.email          = "Not specified";
      this.shipping       = [];
      this.billing        = [];
    }
  }

  class Template {
    construcor( formData ){
      this.name     = formData.name;
      this.tagline  = formData.tagline || '';
      this.img      = formData.img;
      this.caption  = formData.caption;
      this.quote    = formData.quote || '';
      this.author   = formData.author || '';
      this.bio      = formData.bio || '';
      this.timeline = formData.timeline || '';
      this.link     = formData.link || '';
    }
  }

  //Ensure Authenticated/Not Authenticated middleware
  function ensureNotAuthenticated(req, res, next) {
    console.log(`User: ${req.body.username}, auth check. ${currentTimeEST()}`);
    if (req.isAuthenticated()) {
      return res.json({
        auth: true,
        msg: "You're already logged in!",
        username: req.user.username,
      });
    }
    return next();
  }
  function ensureAuthenticated(req, res, next) {
    console.log(`User: ${req.body.username}, auth check. ${currentTimeEST()}`);
    if (req.isAuthenticated()) {
      return next();
    }
    return res.json({
      auth: false,
      msg: "User is not logged in!"
    });
  }

  app.route("/api/tribute")
    .post(function (req, res){
      let searchTerm = {};
      //if it's a template request, it'll have an id
      if ( req.body.id )
        searchTerm = { _id: new ObjectId(req.body.id) };
      //otherwise search by name
      else searchTerm = { name: req.body.name };

      database(async function (client) {
        let result = await client.db('tributes-inc').collection('pages').findOne(searchTerm);

        if (result === null){
          console.log("Couldn't find the requested tribute! " + req.body);
          return null;
        }
        else {
          console.log(`sending ${result}`);
          return res.json(result);
        }
      });
    });

  app.route("/api/login")
    .get(ensureNotAuthenticated, function (req, res, next) {
      res.json({ auth: false, msg: "User is not currently logged in." });
    })
    .post(ensureNotAuthenticated, function (req, res, next) {
      passport.authenticate("local", function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.json({
            auth: false,
            msg: "Incorrect username or password",
          });
        }
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.json({
            auth: true,
            msg: `${req.user.username} has successfully signed in!`,
            username: req.user.username,
          });
        });
      })(req, res, next);
    });

  app.route("/api/logout")
    .get((req, res) => {
      req.logout();
      res.redirect("/#home");
    });

  //User registration
  app.route("/api/register").post(
    (req, res, next) => {
      console.log(`register request: ${req.body.username}. ${currentTimeEST()}`);

      const hash = bcrypt.hashSync(req.body.password, 12);

      database(async function (client) {
        let findResults = await client
          .db("tributes-inc")
          .collection("users")
          .findOne({ username_lower: req.body.username.toLowerCase() });

        if (findResults === null) {
          let insertResults = await client
            .db("tributes-inc")
            .collection("users")
            .insertOne(new User(req.body.username, hash));

          if (insertResults.insertedCount === 0) {
            res.json({
              auth: false,
              msg:
                "An error occurred while trying to create a user. Please try again.",
            });
            console.log(
              "User wasn't found, but a new one wasn't added... There's probably a mongo error. " +
                currentTimeEST()
            );
          } else {
            next(null, insertResults.ops[0]);
          }
        } else {
          res.json({
            auth: false,
            msg: "Error, user already exists! Please pick a new name.",
          });
          console.log(
            "User tried to register a name that already exists. " +
              currentTimeEST()
          );
        }
      });
    },
    passport.authenticate("local"),
    (req, res, next) => {
      res.json({
        auth: true,
        msg: "Account created successfully!",
        username: req.body.username,
      });
      console.log(
        "A new user '" +
          req.body.username +
          "' was created at " +
          currentTimeEST()
      );
    }
  );

}

module.exports = routes;
