var passport = require('passport');
var express = require('express');
const mongodb = require('mongodb');
// const router = express.Router();
const bcrypt = require('bcryptjs');
var User = require("../../models/user");

const router = express.Router();

// Get Users
router.get('/', async (req, res) => {
  const users = await loadUsersCollection();
  res.send(await users.find({}).toArray());
  // res.send("Hello");
});

router.get('/verify', async (req, res) => {
  console.log("User Verified!");
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
    errors.push({ msg: 'Passwords do not match' });
  }

  // if (pass.length < 6) {
  //   errors.push({ msg: 'Password must be at least 6 characters' });
  // }

  if (errors.length > 0) {
    console.log(errors);
    // res.render('register', {
    //   errors,
    //   fname,
    //   lname,
    //   uname,
    //   pass,
    //   confirm
    // });
  } else {
    User.findOne({ uname: uname }).then(user => {
      if (user) {
        errors.push({ msg: 'User already exists' });
        console.log(errors);
        // res.render('register', {
        //   errors,
        //   fname,
        //   lname,
        //   uname,
        //   pass,
        //   confirm
        // });
      } else {
        const newUser = new User({
          fname,
          lname,
          uname,
          pass
        });

        console.log(newUser.pass);

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.pass, salt, (err, hash) => {
            if (err) throw err;
            newUser.pass = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                // res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', passport.authenticate('local'), function (req, res) {
  //   successRedirect: '/api/login/verify',
  //   // successRedirect: '/',
  //   // failureRedirect: '/users/login',
  //   failureRedirect: '/api/login/',
  //   failureFlash: true
  // })(req, res, next);
    res.send("Success");
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  // res.redirect('/users/login');
});

async function loadUsersCollection() {
  // try {
    // console.log("try");
    const client = await mongodb.MongoClient.connect(
      'mongodb+srv://belloq:1234@medival-math-mania-dodmo.mongodb.net/test?retryWrites=true',
      {
        useNewUrlParser: true
      }
    );
  // } catch(err) {
  //   console.log("Error: " + err + " :End");
  // }

  return client.db('test').collection('users');
};

module.exports = router;
