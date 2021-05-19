const mongoose = require('mongoose')
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken');

const tokenVerificationSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 30
    }
},{
    timestamps: true
});

module.exports = mongoose.model('TokenVerification', tokenVerificationSchema); // User > users