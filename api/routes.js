
const passport = require("passport");
const bcrypt = require("bcrypt");

const currentTimeEST = () =>
  Date().toLocaleString("en-US", { timeZone: "EST" }) + " EST";

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
    }
  }

  //Ensure Authenticated middleware
  function ensureAuthenticated(req, res, next) {
    console.log(`Verifying authentication for user ${req.body.username}`);
    if (req.isAuthenticated()) {
      console.log("User is already logged in!");
      return res.json({
        auth: true,
        msg: "You're already logged in!",
        username: req.user.username,
      });
      //return next();
    }
    console.log("User is not logged in.");
    return next();
  }

  app
    .route("/api/login")
    .get(ensureAuthenticated, function (req, res, next) {
      res.json({ auth: false, msg: "User is not currently logged in." });
    })
    .post(ensureAuthenticated, function (req, res, next) {
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

  app.route("/api/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });

  //User registration
  app.route("/api/register").post(
    (req, res, next) => {
      console.log("register request received.");
      console.log(`info was: ${req.body.username}:${req.body.password}`);

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

  /*
  //404 handler
  app.use((req, res, next) => {
    res.status(404)
      .render(process.cwd() + '/views/pug/fourohfour', {})
  });
*/
}

module.exports = routes;
