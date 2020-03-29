const passport = require("passport");
const LocalStrategy = require("./passport-strategy");
const { users: User } = require("../models");

passport.serializeUser(function(user, done) {
  console.log('serialize',user.id)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserialize',id)
 
  User.findByPk(id).then(function(user) {
      if (user) {
          done(null, user.get());
      } else {
          done(user.errors, null);
      }
  });
});

passport.use(LocalStrategy);
module.exports = passport;
