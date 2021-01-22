const passport = require("passport");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { nameList } = require("./namelist");

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
    constructor( formData ){
      this.name       = formData.name;
      this.name_lower = formData.name.toLowerCase();
      this.tagline    = formData.tagline || '';
      this.img        = formData.img;
      this.caption    = formData.caption;
      this.quote      = formData.quote || '';
      this.author     = formData.author || '';
      this.palette    = formData.palette || 'classic';
      this.bio        = formData.bio || '';
      this.timeline   = formData.timeline || '';
      this.visible    = formData.visible || true;
      this.link       = formData.link || '';
      this.type       = formData.type;
      this.approved   = false;
      this.flagged    = false;
      this.created_on = currentTimeEST();
      this.username   = formData.username;
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

  // requesting tribute info for display
  app.route("/api/tribute")
    .post(function (req, res){
      let searchTerm = {};
      //if it's a template request, it'll have an id
      if ( req.body.id )
        searchTerm = { _id: new ObjectId(req.body.id) };
      //otherwise search by name
      else searchTerm = { name_lower: req.body.name.toLowerCase() };

      database(async function (client) {
        let result = await client.db('tributes-inc').collection(req.body.id?'pages':'tributes')
          .findOne(searchTerm, {projection: {flagged: 0, visible: 0, created_on: 0, username: 0, name_lower: 0}});

        if (result === null){
          console.log(`Page lookup: Could not find ${req.body.name}! @ ${currentTimeEST()}`);
          return res.send('No match found!');
        }
        else {
          console.log(`Page lookup: sending ${result} @ ${currentTimeEST()}`);
          return res.json(result);
        }
      });
    });

  app.route("/api/login")
    // get used to determine if a user is still logged in on inital site loading
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
      console.log(`Register request: ${req.body.username}. ${currentTimeEST()}`);

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

  //Template Build/Edit/Delete Request
  app.route("/api/design")
    .post((req, res) => {

      // format the timeline for db upload
      if ( req.body["year1"] ){
        req.body.timeline = [];
        Object.keys(req.body).forEach(key=>{
          // if it's a year and the year isn't empty
          if( key.startsWith('year') && req.body[key] ){
            // push the [year and event] into the timeline. event grabs the current number from the year 'index'
            req.body.timeline.push([req.body[key],req.body[`event${key.split('r')[1]}`]]);
          }
        });
      }
      //format the biography for db upload
      else {
        req.body.bio = req.body.bio.replace(/\r\n/g, '\n').split('\n').filter((value)=> value)
      }

      console.log(`${req.body.username} submitted a tribute @ ${currentTimeEST()}`);

      database(async function (client) {

        let validSubmission = true

        // check for this tribute's name already in the DB
        let findResults = await client
          .db("tributes-inc")
          .collection("tributes")
          .findOne({ name_lower: req.body.name.toLowerCase() });

        if (findResults !== null) validSubmission = false;

        // check for more than two tributes under this user
        let findArray = await client
          .db("tributes-inc")
          .collection("tributes")
          .find({ username: req.body.username })
            .toArray();

        if (findArray.length>1) validSubmission = false;
        // else list the number of tributes they have
        else console.log(`${req.body.username}'s current total submissions ${findArray.length}`);

        // if it's still a valid submission, post it
        if (validSubmission) {
          let insertResults = await client
            .db("tributes-inc")
            .collection("tributes")
            .insertOne(new Template(req.body));

          if ( insertResults.insertedCount === 1 ) {
            console.log('The submission was successful. ' + currentTimeEST())
            res.send('Success! Tribute saved.');
          }
          else {
            console.log('The submission was unsuccessful. ' + currentTimeEST())
            res.send('Something went wrong during the save process, please try again or contact us!');
          }
        }
        else {
          res.send(findResults?'A tribute for this person already exists...':"You already have two free tribute pages.")
        }
      });
    })
    .put((req, res) => {
      let editType  = req.body.editType;
      let user      = req.body.username;
      let origin    = req.body.origin||req.body.name;
      let toEdit    = req.body.name;
      let modObject = {};
      let checkName = origin===toEdit?false:true; // flag to see if a changed name is already in db

      // if hiding or showing
      if ( editType === 'hide' ) modObject = {$set: {"visible": false} };
      else if ( editType === 'show' ) modObject = {$set: {"visible": true} };
      // if making an edit to an existing tribute
      else {
        // format the timeline for db upload
        if (req.body["year1"]) {
          req.body.timeline = [];
          Object.keys(req.body).forEach(key => {
            // if it's a year and the year isn't empty
            if (key.startsWith('year') && req.body[key]) {
              // push the [year and event] into the timeline. event grabs the current number from the year 'index'
              req.body.timeline.push([req.body[key], req.body[`event${key.split('r')[1]}`]]);
            }
          });
        }
        //format the biography for db upload
        else {
          req.body.bio = req.body.bio.replace(/\r\n/g, '\n').split('\n').filter((value) => value)
        }
        let updTemp = new Template(req.body);
        delete updTemp.created_on;
        modObject = { $set: updTemp }
      }

      database(async function (client) {
        if ( checkName ) {
          let findResults = await client
            .db("tributes-inc")
            .collection("tributes")
            .findOne({ name: toEdit })

          if ( findResults !== null ) {
            console.log(`Update failure @ ${currentTimeEST()}` )
            console.log(`${user} : Edit name - ${origin} -> ${toEdit}`);
            res.send(`Cannot perform edit: your new tribute name already exists!`);
          }
          else {
            checkName = false; // reset flag so that update can proceed
          }
        }

        // use checkName again to proceed with update
        if ( checkName === false ) {
          let updateResults = await client
            .db("tributes-inc")
            .collection("tributes")
            .updateOne({ name: toEdit }, modObject );

          // if it was modified
          if ( updateResults.modifiedCount === 1) {
            console.log(`Update success @ ${currentTimeEST()}` );
            console.log(`${user} : ${editType} - ${toEdit}`);
            res.send(`Tribute successfully updated.`);
          }
          // if it matched but didn't edit ( likely no changes were made )
          else if ( updateResults.modifiedCount === 0 && updateResults.matchedCount === 1) {
            console.log(`Update failure @ ${currentTimeEST()}` );
            console.log(`${user} : Edit - ${toEdit} - No changes were submitted`);
            console.log(updateResults);
            res.send(`Cannot perform edit: you did not make any changes!`);
          }
          // if it didn't match or if it otherwise had an error
          else {
            console.log(`Update failure @ ${currentTimeEST()}` );
            console.log(`${user} : ${editType} - ${toEdit}`);
            //console.log(updateResults); //optionally spit out the entire result if verbosity is needed
            res.send(`Tribute did not update.`);
          }
        }
      });
    })
    .delete((req, res) => {
      let user = req.body.username;
      let toDelete = req.body.name;
      
      database(async function (client) {
        let deleteResults = await client
          .db("tributes-inc")
          .collection("tributes")
          .deleteOne({ name: toDelete });

        if( deleteResults.deletedCount === 1) {
          console.log( `Delete success @ ${currentTimeEST()}` );
          console.log( `${user} : ${toDelete}` );
          res.send(`Tribute successfully deleted.`);
        }
        else {
          console.log( `Delete failure @ ${currentTimeEST()}` );
          console.log( `${user} : ${toDelete}` );
          res.send(`Deletion failure, please try again.`);
        }
      });
    });

  //Tribute List Request
  app.route("/api/list")
    .post((req, res) => {
      let reqType = req.body.type;
      let query = {};
      let options = {sort: {'name': 1}};

      switch(reqType){
        case 'directory':
          query.approved = true;
          query.visible  = true;
          options.projection = {"name": 1, "username":1, "approved": 1}
          break;
        case 'user':
          query.username = req.body.username;
          options.projection = {"name": 1, "approved": 1, "type": 1, "visible": 1, "created_on": 1};
          break;
      }

      database(async function (client) {
        let resultsArray = await client.db('tributes-inc').collection('tributes').find(query, options).toArray();

        console.log(`${reqType} list request @ ${currentTimeEST()}`);
        res.send(resultsArray);
      })
    });

  //db manipulation to fill out the directory
  app.route("/api/admin")
    .post((req, res) => {
      let nameArray = nameList;
      let tribArray = [];
      tribArray = nameArray.map((value, index) => {return(
        {
        "name"       : value,
        "name_lower" : value.toLowerCase(),
        "tagline"    : `${value}'s sub-title`,
        "img"        : './img/test-house.jpg',
        "caption"    : `${value}'s caption`,
        "quote"      : `${value}'s quote`,
        "author"     : `${value}'s quote author`,
        "palette"    : index%3===0?'classic':index%2===0?'cool':'warm',
        "bio"        : index%2===0?[`${value}'s biography is nothing particularly exciting to behold, however we did not want them forgotten.`, 'Here is a little bit of extra text to help make sure that the entry is not too barren. We hope that you can appreciate their life as much as others in the world have.']:'',
        "timeline"   : index%2===1?[['2000', `${value} was born`], ['2017', `${value} started their secondary education`], ['2021', `${value}'s timeline was created`]]:'',
        "visible"    : true,
        "link"       : `https://en.wikipedia.org/wiki/${value.split(' ').join('_')}`,
        "type"       : index%2===0?'TemplateA':'TemplateB',
        "approved"   : true,
        "flagged"    : false,
        "created_on" : currentTimeEST(),
        "username"   : 'admin'
        })
      });
      console.log(`Admin database entry creation @ ${currentTimeEST()}`);
      database( async function (client) {
        let insertResults = await client.db('tributes-inc').collection('tributes').insertMany(tribArray);
        console.log(`${insertResults.insertedCount} entries added.`);
        res.send(`${insertResults.insertedCount} entries added.`)
      });
    })
    .delete((req,res) => {
      console.log(`Admin database entry deletion @ ${currentTimeEST()}`);
      database( async function (client) {
        let deleteResults = await client.db('tributes-inc').collection('tributes').deleteMany({"username": "admin"})
        console.log(`${deleteResults.deletedCount} entries deleted at ${currentTimeEST()}`);
        res.send(`${deleteResults.deletedCount} entries deleted.`)
      });
  })
  
}

module.exports = routes;
