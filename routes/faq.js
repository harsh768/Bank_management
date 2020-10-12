const express = require('express');
const router = express.Router();

const faqController = require('../controllers/faq_controller');

router.get('/',faqController.home);
router.get('/message',faqController.message);

module.exports = router;