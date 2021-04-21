const mongoose = require('mongoose')
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 255,
        required: true
    },
    last_name: {
        type: String,
        max: 255,
        required: true
    },
    email: {
        type: String,
        max: 255,
        required: true
    },
    password: {
        type: String,
        min: 8,
        max: 255,
        required: true
    },
},{
    timestamps: true
});

userSchema.methods.Encrypt = function (password) {
    this.password = CryptoJS.AES.encrypt(password, process.env.KEY_ENCRYPTION).toString();
}

userSchema.methods.isPasswordMatching = function (password) {
    var bytes  = CryptoJS.AES.decrypt(this.password, process.env.KEY_ENCRYPTION);
    return bytes.toString(CryptoJS.enc.Utf8) === password
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({email: this.email}, process.env.KEY_JWT,  { expiresIn: '12h' });
}

module.exports = mongoose.model('User', userSchema); // User > users




// var token = jwt.sign({email_id:'123@gmail.com'}, "Stack", {

//     expiresIn: '24h' // expires in 24 hours

//      });