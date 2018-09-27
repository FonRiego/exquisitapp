const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, 
  (username, password, done) => {
    User.findOne({ username })
    .then(foundUser => {
      if (!foundUser) {
        done(null, false, { message: 'Nombre de usuario o contraseña incorrectos' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        done(null, false, { message: 'Nombre de usuario o contraseña incorrectos' });
        return;
      }

      done(null, foundUser);
    })
    .catch(err => done(err));
  }
));

// passport.use(new FacebookStrategy({
//   clientID: FACEBOOK_APP_ID,
//   clientSecret: FACEBOOK_APP_SECRET,
//   callbackURL: "http://www.example.com/auth/facebook/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//   User.findOrCreate(..., function(err, user) {
//     if (err) { return done(err); }
//     done(null, user);
//   });
// }
// ));
