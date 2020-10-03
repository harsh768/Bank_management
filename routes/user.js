const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/create',userController.create);
router.get('/profile',userController.profile);
router.get('/login',userController.login);
router.get('/forgot_password',userController.forgot_password);
router.get('/sign-up',userController.sign_up);



module.exports = router;