var passport = require('passport');
var express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const db = require('../../config/keys').mongoURI;
var Account = require("../../models/account");
var Stats = require("../../models/stats");

const router = express.Router();

// Get Users
router.get('/', async (req, res) => {

  const users = await loadUsersCollection();
  res.send(await users.find({}).toArray());

});

// Find User Stats
router.post('/find', async (req, res) => {

  Stats.findOne({
    uname: req.body.uname
  }).then(stat => {
    console.log(stat);
    if (!stat) {
      console.log("User not found");
    } else {
      console.log(stat);
      res.send(stat);
    }
  });

});

// Register
router.post('/register', (req, res) => {
  // const { fname, lname, uname, pass, confirm } = req.body;
  console.log(req.body.pass);
  const fname = req.body.fname;
  const lname = req.body.lname;
  const uname = req.body.uname;
  const pass = req.body.pass;
  const confirm = req.body.confirm;
  let errors = [];

  if (!fname || !lname || !uname || !pass || !confirm) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (pass != confirm) {
    // errors.push({ msg: 'Passwords do not match' });
  }

  if (pass.length < 6) {
  //   errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    console.log(errors);
    // RENDER ERROR TEXT HERE
  } else {
    Account.findOne({ uname: uname }).then(user => {

      if (user) {
        errors.push({ msg: 'User already exists' });
        console.log(errors);
        // RENDER ERROR TEXT HERE
      } else {
        const newAccount = new Account({
          fname,
          lname,
          uname,
          pass
        });
        const newStats = new Stats({
          uname
        });

        console.log(newAccount);
        console.log(newStats);

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAccount.pass, salt, (err, hash) => {
            if (err) throw err;
            newAccount.pass = hash;
            newStats
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                // res.redirect('/users/login');
              })
              .catch(err => console.log(err));
            newAccount
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                // res.redirect('/users/login');
              })
              .catch(err => console.log(err));

              res.send( { result:"Success", user: newAccount.uname, first: newAccount.fname, last: newAccount.lname } );
          });
        });

      }
    });
  }
});

// Login
router.post('/login', passport.authenticate('local'), function (req, res) {

  //   successRedirect: '/',
  //   failureRedirect: '/api/login/',
  //   failureFlash: true
  // })(req, res, next);

  res.send( { result:"Success", user: req.user.uname, first: req.user.fname, last: req.user.lname } );

});

// Logout
router.get('/logout', (req, res) => {

  req.logout();
  req.flash('success_msg', 'You are logged out');
  console.log("Signed Out");
  // res.send();

});

async function loadUsersCollection() {

  const client = await mongodb.MongoClient.connect( db, { useNewUrlParser: true } );

  return client.db('test').collection('accounts');

};

async function loadStatsCollection() {

  const client = await mongodb.MongoClient.connect( db, { useNewUrlParser: true } );

  return client.db('test').collection('stats');

};

module.exports = router;
