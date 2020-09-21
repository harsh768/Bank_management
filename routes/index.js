const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');


console.log('router loaded');

router.get('/',homeController.home);
router.use('/personal_banking',require('./personal_banking'));
router.use('/faq',require('./faq'));

module.exports = router;