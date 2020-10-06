const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');


console.log('router loaded');

router.get('/',homeController.home);
router.use('/user/money',require('./money'));
router.use('/user',require('./user'));
router.use('/faq',require('./faq'));

router.get('/play-game',homeController.game);

module.exports = router;