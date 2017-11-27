var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var encryptLib = require('../modules/encryption');
var pool = require('../modules/pool.js');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  pool.connect(function (err, client, release) {
    if (err) {
      console.log('connection err ', err);
      release();
      done(err);
    }

    var user = {};

    client.query("SELECT * FROM users WHERE id = $1", [id], function (err, result) {
      // Handle Errors
      if (err) {
        console.log('query err ', err);
        done(err);
        release();
      }

      user = result.rows[0];
      release();

      if (!user) {
        // user not found
        return done(null, false, { message: 'Incorrect credentials.' });
      } else {
        // user found
        done(null, user);
      }

    });
  });
});

// Does actual work of logging in
passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
}, function (req, username, password, done) {
  pool.connect(function (err, client, release) {
    // assumes the username will be unique, thus returning 1 or 0 results
    client.query("SELECT * FROM users WHERE username = $1", [username],
      function (err, result) {
        var user = {};

        // Handle Errors
        if (err) {
          console.log('connection err ', err);
          done(null, user);
        }

        release();

        if (result.rows[0] != undefined) {
          user = result.rows[0];
          // Hash and compare
          if (encryptLib.comparePassword(password, user.password)) {
            // all good!
            console.log('passwords match');
            done(null, user);
          } else {
            console.log('password does not match');
            done(null, false, { message: 'Incorrect credentials.' });
          }
        } else {
          console.log('no user');
          done(null, false);
        }

      });
  });
}
));

module.exports = passport;
