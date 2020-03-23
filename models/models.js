const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const logger = require('./../utils/logger')
const Schema = mongoose.Schema;


mongoose.connect('mongodb://127.0.0.1:27017/experience-db', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', error => logger.error(error) );
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
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
module.exports = {
    User
};