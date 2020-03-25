const express = require('express');
const router = express.Router();
const passport = require('passport');
const experienceController = require('./../controllers/experience-controller');


router.post('/experience', experienceController.addExperience);

module.exports = router;
