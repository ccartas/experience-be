const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('./../controllers/user-controller');

router.post('/register', passport.authenticate('register', {session: false }), userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;