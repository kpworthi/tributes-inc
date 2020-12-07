
const passport = require('passport');
const bcrypt = require('bcrypt');

const currentTimeEST = () => Date().toLocaleString('en-US', { timeZone: 'EST'}) + ' EST';

function routes (app, database) {

  class User {
    constructor ( username, password ) {
      this.username= username;
      this.password= password;
      this.created_on= currentTimeEST();
      this.last_login= currentTimeEST();
      this.realname_first= 'Not specified';
      this.realname_last= 'Not specified';
      this.email= 'Not specified';
    }
  }

  //Ensure Authenticated middleware
  function ensureAuthenticated(req, res, next) {
    console.log(`Verifying authentication for user ${req.body.username}`);
    if (req.isAuthenticated()) {
      console.log("User is already logged in!.");
      return res.send("You're already logged in!");
      //return next();
    }
    console.log("User is not logged in.")
    return next();
  };
  
  app.route('/login') 
    .post( ensureAuthenticated,
      function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send('Incorrect username or password'); }
        req.login(user, function(err) {
          if (err) { return next(err); }
          return res.send(`${req.user.username} has successfully signed in!`);
        });
      })(req, res, next);
    });

  app.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });

  //User registration
  app.route('/register')
    .post((req, res, next) => {
      console.log('register request received.')
      console.log(`info was: ${req.body.username}:${req.body.password}`);

      const hash = bcrypt.hashSync(req.body.password, 12)
      
      database(async function (client) {
        let findResults = await client.db('tributes-inc').collection('users').findOne({ username: req.body.username }) 
        
        if ( findResults === null ) {
          let insertResults = await client.db('tributes-inc').collection('users').insertOne( new User(req.body.username, hash));

          if( insertResults.insertedCount === 0 ){
            res.send('An error occurred while trying to create a user. Please try again.');
            console.log("User wasn't found, but a new one wasn't added... There's probably a mongo error. " + currentTimeEST())
            //next('db error');
          }
          else {
                res.send('Account created successfully!');
                console.log("A new user '" + req.body.username + "' was created at " + currentTimeEST());
                //next(null, insertResults.ops[0]);
          }

        } else {
          res.send('Error, user already exists! Please pick a new name.')
          console.log("User tried to register a name that already exists. " + currentTimeEST())
          //next('user already exists');
        }

      });
      /*
  },passport.authenticate('local', { failureRedirect: '/' }),
    (req, res, next) => {
      res.redirect('/profile');*/
    }
  );

/*
  //Chat handler
  app.route('/chat')
    .get(ensureAuthenticated, 
         function(req, res, next){
           res.render(process.cwd() + '/views/pug/chat', {
             user: req.user
           })
         });

  //404 handler
  app.use((req, res, next) => {
    res.status(404)
      .render(process.cwd() + '/views/pug/fourohfour', {})
  });
  */
}

module.exports = routes;
