const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

router.post('/create',userController.create);
router.get('/profile',userController.profile);
router.get('/login',userController.login);
router.get('/forgot_password',userController.forgot_password);
router.post('/forgot-password-form',userController.forgot_password_form);

router.get('/sign-up',userController.sign_up);

router.get('/balance/:id',passport.checkAuthentication,userController.balance);
router.get('/account-details/:id',passport.checkAuthentication,userController.details);

router.get('/update-details',passport.checkAuthentication,userController.update);
router.post('/update-details/:id',passport.checkAuthentication,userController.update_db);

router.get('/reset-password',userController.resetpassword);
router.post('/reset-password-form',userController.resetpasswordform);

router.get('/recent-transactions/:id',passport.checkAuthentication,userController.transactions);

//use passport a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/user/login'},
),userController.createSession); // if authentication success then userController->createSession is called

router.get('/sign-out',userController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// below route is defined in index.js because it required callback route as /users/auth..
// router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);

module.exports = router;