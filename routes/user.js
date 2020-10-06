const express = require('express');
const router = express.Router();
const passport = require('passport');


const userController = require('../controllers/user_controller');

router.post('/create',userController.create);
router.get('/profile',userController.profile);
router.get('/login',userController.login);
router.get('/forgot_password',userController.forgot_password);
router.get('/sign-up',userController.sign_up);

router.get('/balance/:id',userController.balance);
router.get('/account-details/:id',userController.details);

//use passport a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/user/login'},
),userController.createSession); // if authentication success then userController->createSession is called

router.get('/sign-out',userController.destroySession);

module.exports = router;