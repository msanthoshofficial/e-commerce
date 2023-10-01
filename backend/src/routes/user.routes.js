const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/user',auth.jwt_verify,userController.get_user);
router.put('/user',auth.jwt_verify,userController.create_user)

module.exports = router;