const passport = require('passport')
const LocalStrategy = require('./passport-strategy')
const User = require('../models/Users')

passport.serializeUser((user, done) => {
    done(null, { _id: user._id})
})

passport.deserializeUser((id, done) => {
    console.log('DeserializeUser called')
    User.findOne(
        {_id: id},
        'username',
        (err, user) => {
            console.log('*** Deserialize called, user: ');
            console.log(user);
            done(null, user)
        }
    )
})
passport.use(LocalStrategy);
module.exports = passport;
