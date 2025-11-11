const express = require('express');
const { upload } = require('../middlewares/multerMiddleware.js');
const { registerUser, loginUser } = require('../controller/authController.js');

const router = express.Router();

router.post("/register", upload.single("resume"), registerUser);
router.post("/login", loginUser);

module.exports = router;
