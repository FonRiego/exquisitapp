const passport = require('passport');
const facebook = require('passport-facebook').Strategy;
const User = require('../models/User');
const findOrCreate = require('mongoose-find-or-create')


passport.use(new facebook({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  // callbackURL: "http://localhost:3000/auth/facebook/callback"
  callbackURL: "https://exquisit-app.herokuapp.com/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ username: profile.displayName, facebookId: profile.id }, function (err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
}
));
