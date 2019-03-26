const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User model
const Account = require('../models/account');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'uname', passwordField: 'pass' }, (uname, pass, done) => {
      console.log(uname);
      // Match user
      Account.findOne({
        uname: uname
      }).then(user => {
        if (!user) {
          console.log("User not found");
          return done(null, false, { message: 'That user is not registered' });
        }

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
    Account.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
