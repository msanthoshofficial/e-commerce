const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/user',(req,res)=>{res.send('SUCCESS')});
router.put('/user',userController.create_user)

module.exports = router;