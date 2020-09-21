const express = require('express');
const router = express.Router();

const faqController = require('../controllers/faq_controller');

router.get('/',faqController.home);

module.exports = router;