const express = require('express');
const router = express.Router();
const passport = require('passport')
const moneyController = require('../controllers/money_controller');

router.get('/deposit',moneyController.deposit);
router.post('/deposit-money/:id',passport.checkAuthentication,moneyController.deposit_db);

router.get('/withdraw',moneyController.withdraw);
router.post('/withdraw-money/:id',passport.checkAuthentication,moneyController.withdraw_db);

router.get('/transfer',moneyController.transfer);
router.post('/transfer-money/:id',passport.checkAuthentication,moneyController.transfer_db);

router.get('/request',moneyController.request);
router.post('/request-money/:id',passport.checkAuthentication,moneyController.send_request);
router.get('/request-money-transfer/:id',moneyController.RequestMoneyTransfer);


module.exports = router;