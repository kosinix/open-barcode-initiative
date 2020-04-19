
//// Core modules
const crypto = require('crypto');
const util = require('util');
const randomBytesAsync = util.promisify(crypto.randomBytes);

//// External modules
const lodash = require('lodash');
const mongoose = require('mongoose');

//// Modules

let schema = mongoose.Schema({
    username: {
        type: String,
    },
    passwordHash: {
        type: String,
    },
    passwordSalt: {
        type: String,
    },
    email: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    photo: {
        type: String,
    },
}, { timestamps: true });

//// Instance methods


//// Statics
schema.statics.hashPassword = function (password, salt) {
    return crypto.pbkdf2Sync(password, Buffer.from(salt, 'base64'), 10000, 64, 'SHA1').toString('hex');
};

module.exports = schema