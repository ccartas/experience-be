const passport = require('passport');
const logger = require('./logger');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const { User } = require('./../models/models');

passport.use('register', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const user = await User.create({firstName, lastName, username, password});
        return done(null, user);
    } catch(err) {
        logger.error(`An error occured: ${err}`);
        return done(err);
    }
}));

passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
}, async (username, password, done) => {
    try { 
        const user = await User.findOne({username});
        if(!user) {
            return done(null, false, {message: 'User not found'})
        }
        const isPasswordValid = await user.checkUserPassword(password);
        if(!isPasswordValid) {
            return done(null, false, {message: 'Password is incorrect'});
        }
        return done(null, user, {message: 'User logged in successfully'});
    } catch(err) {
        return done(err);
    } 
}))

passport.use(new JWTstrategy({
    //secret we used to sign our JWT
    secretOrKey : 'angular_upskilling',
    //we expect the user to send the token as a query parameter with the name 'secret_token'
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
  }, async (token, done) => {
    try {
      //Pass the user details to the next middleware
      console.log(token);
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }));