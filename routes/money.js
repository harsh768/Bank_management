const express = require('express');
const router = express.Router();
const passport = require('passport')
const moneyController = require('../controllers/money_controller');

router.get('/deposit',moneyController.deposit);
router.post('/deposit-money/:id',passport.checkAuthentication,moneyController.deposit_db);


module.exports = router;