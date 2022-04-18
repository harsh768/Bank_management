const express = require('express');
const passport = require('passport');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const userController =  require('../controllers/user_controller');

console.log('router loaded');

router.get('/',homeController.home);
router.use('/user/money',require('./money'));
router.use('/user',require('./user'));
router.use('/faq',require('./faq'));

router.get('/play-game',homeController.game);

//callback route for google authentication. Other route is in user.js
router.get('/users/auth/google/callback', passport.authenticate('google', {failureRedirect: '/user/login'}), userController.createSession);


module.exports = router;