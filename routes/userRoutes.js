const express = require('express');
const { getUserData } = require('../controller/userController');
const { superAdminOnly } = require('../middlewares/superAdminMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/getAll", authMiddleware, superAdminOnly, getUserData);

module.exports = router;
