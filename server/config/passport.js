const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/user');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'uname', passwordField: 'pass' }, (uname, pass, done) => {
      console.log(uname);
      // Match user
      User.findOne({
        uname: uname
      }).then(user => {
        if (!user) {
          console.log("User not found");
          return done(null, false, { message: 'That user is not registered' });
        }

        console.log(pass);

        // Match password
        bcrypt.compare(pass, user.pass, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            console.log("Password not correct");
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
