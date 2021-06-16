const mongoose = require('mongoose')
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')
const Email = require('../utils/email')
const Encryption = require('../utils/encryption')

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
        unique: true,
        max: 255,
        required: true
    },
    password: {
        type: String,
        min: 8,
        max: 255,
        required: true
    },
    profilepic: {
        type: String,
        max: 255,
        default: "uploads\\baseprofilepic.jpeg"
    },
    phone: {
        type: String,
        max: 255
    },
    address: {
        type: String,
        max: 255
    },
    city: {
        type: String,
        max: 255
    },
    zip: {
        type: String,
        max: 255
    },
    active: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

// userSchema.pre("save", async function (next) {
    // 43200000
    // setTimeout(async function(next) {
    //     console.log("bite")
    //     const document = await User.Model.findOne(this._id);
    //     await document.remove() 
    //     }, 10000);
    //   next();
// })

userSchema.methods.isPasswordMatching = function (password) {
    var bytes  = CryptoJS.AES.decrypt(this.password, process.env.KE_PASSWORD);
    return bytes.toString(CryptoJS.enc.Utf8) === password
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({email: this.email}, process.env.K_JWT,  { expiresIn: '12h' });
}

userSchema.methods.sendEmailConfirmation = async function () {
    var mailOptions = {
        from: '"Freedgy" <area.dev@outlook.com>',
        to: this.email,
        subject: 'Account confirmation',
        // text: process.env.HOST + "/user/confirmation/" + Encryption.Encrypt(this._id.toString(), process.env.KE_TOKEN_VERIFICATION)
        text: process.env.HOST + "/user/confirmation/" + this._id.toString() // need to be hash // could use uuid ?
    };
    Email.Transporter.sendMail(mailOptions);   
}

userSchema.methods.sendEmailReset = async function (uuid) {
    var mailOptions = {
        from: '"Freedgy" <area.dev@outlook.com>',
        to: this.email,
        subject: 'Reset password',
        text: process.env.HOST + "/user/reset/" + uuid // need to be hash // could use uuid ?
    };
    Email.Transporter.sendMail(mailOptions);   
}

module.exports = mongoose.model('User', userSchema);