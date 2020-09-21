const express = require('express');
const router = express.Router();

const personalBankingController = require('../controllers/personal_banking_controller');

router.get('/profile',personalBankingController.profile);
router.get('/login',personalBankingController.login);
router.get('/forgot_password',personalBankingController.forgot_password);
router.get('/sign-up',personalBankingController.sign_up);



module.exports = router;