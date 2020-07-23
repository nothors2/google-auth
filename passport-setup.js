var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const keys = require('./keys');
//console.log(keys);

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "http://localhost:5000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //here use profile by db
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, profile);
    //});
  }
));
passport.serializeUser(function(user, done) {
  console.log("#########serializeUser#####",user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("#########deserializeUser#####",user);
  //User.findById(id, function(err, user) {
    done(null, user);
  //});
});
