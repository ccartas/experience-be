const passport = require('passport');
const logger = require('./../utils/logger');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
    res.status(201).json({
        message: "User created successfully."
    })
}

const loginUser = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if(err || !user) {
                logger.error(`An error occured ${err}`);
                return next(err);
            }
            req.login(user, {session: false}, async (err) => {
                if(err) return next(err);
                const body = { _id: user._id, username: user.username };
                const token = jwt.sign({user: body}, 'angular_upskilling');
                return res.json({
                    user_id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    token,
                })
            })
        } catch(err) {
            return next(err);
        }
    })(req, res, next);
}

module.exports = {
    registerUser,
    loginUser
}