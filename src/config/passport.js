const passport = require('passport');
const localStrategy = require('passport-local');

const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    //match email in DB
    const user = await User.findOne({email});
    if(!user) {
        return done(null, false, {message: 'User Do Not Exist'});
    } else {
        //Match password's user
        const match = await user.matchPassword(password);
        if(match) {
            return done(null, user)
        } else {
            return done(null, false, {message: 'Incorrect Password'});
        }
    }
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});