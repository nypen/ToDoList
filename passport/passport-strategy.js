const User = require('../models/Users')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	async function(username, password, done){
      user = await User.findOne({where:{ username: username }});
    	if (!user) {
        console.log('incorect userame');
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.validPassword(password)) {
        console.log('incorecy password');
				return done(null, false, { message: 'Incorrect password' })
			}
			  return done(null, user)
		})

module.exports=strategy;
