const express = require('express');

const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');

const router = express.Router();

router.use('/', userRoutes);
router.use('/', authRoutes);

module.exports = router;
