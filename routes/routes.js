const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('./../controllers/user-controller');
const experienceController = require('./../controllers/experience-controller');

router.post('/register', passport.authenticate('register', {session: false }), userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/experience', experienceController.getAllExperiences);

module.exports = router;