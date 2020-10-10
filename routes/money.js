const express = require('express');
const router = express.Router();
const passport = require('passport');
const moneyController = require('../controllers/money_controller');

router.get('/deposit',passport.checkAuthentication,moneyController.deposit);
router.post('/deposit-money/:id',passport.checkAuthentication,moneyController.deposit_db);

router.get('/withdraw',passport.checkAuthentication,moneyController.withdraw);
router.post('/withdraw-money/:id',passport.checkAuthentication,moneyController.withdraw_db);

router.get('/transfer',passport.checkAuthentication,moneyController.transfer);
router.post('/transfer-money/:id',passport.checkAuthentication,moneyController.transfer_db);

router.get('/request',passport.checkAuthentication,moneyController.request);
router.post('/request-money/:id',passport.checkAuthentication,moneyController.send_request);
router.get('/request-money-transfer/:id',passport.checkAuthentication,moneyController.RequestMoneyTransfer);


module.exports = router;