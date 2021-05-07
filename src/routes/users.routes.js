const { Router } = require('express');
const router = Router();

const { renderSignUpForm, renderSingInForm, singIn, singUp, logOut } = require('../controllers/users.controllers')

const { isLogged } = require('../helpers/auth')

router.get('/users/signup', isLogged, renderSignUpForm);

router.post('/users/signup', isLogged, singUp);

router.get('/users/signin', isLogged, renderSingInForm);

router.post('/users/signin', isLogged, singIn);

router.get('/users/logout', logOut);



module.exports = router;