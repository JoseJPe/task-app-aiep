const usersCtrl = {};
const User = require('../models/User')
const passport = require('passport');

usersCtrl.renderSignUpForm = (req, res) => {
res.render('users/signup');

};

usersCtrl.singUp = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if(password != confirm_password ) {
        errors.push({text: 'password do not match'});
    }
    if(password.length < 4) { 
        errors.push({ text: 'passwords must be at least 4 characters'})
    }
    if(name == '' || email == '' || password == '' || confirm_password == '') {
        errors.push({ text: 'all fields are required'})
    }
    if(errors.length > 0 ) {
        res.render('users/signup', {
            errors,
            name,
            email
        })
    } else {
        const emailUser = await User.findOne({email: email});
        if ( emailUser ) {
            req.flash('error_msg', 'The email is already in use.');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ name, email, password});
            newUser.password = await newUser.encrypPassword(password)
            await newUser.save();
            req.flash('success_msg', 'User registered Successfully');
            res.redirect('/users/signin');
        }

    }
};

usersCtrl.renderSingInForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.singIn = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/tasks',
    failureFlash: true
});

usersCtrl.logOut = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/users/signin'); 
};

module.exports = usersCtrl;