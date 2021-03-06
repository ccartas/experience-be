const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const logger = require('./../utils/logger')
const Schema = mongoose.Schema;


mongoose.connect('mongodb://127.0.0.1:27017/experience-db', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', error => logger.error(error) );
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const ExperienceSchema = new Schema({
    startingPoint: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    transportationType: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    satisfactionLevel: {
        type: String,
        required: true
    },
    username: {
        type: String
    }
})

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 5);
    this.password = hash;
    next();
})

UserSchema.methods.checkUserPassword = async function(password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
}

const User = mongoose.model('user', UserSchema);
const Experience = mongoose.model('experience', ExperienceSchema);
module.exports = {
    User,
    Experience
};