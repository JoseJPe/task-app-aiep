const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    }
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/users/signin');
}

helpers.isLogged = (req, res, next) => {
    if(req.isAuthenticated()) {
        req.flash('success_msg', 'You Are Already Logged');
        res.redirect('/tasks')
    }

    return next()
}

module.exports = helpers;