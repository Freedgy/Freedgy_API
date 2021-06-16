const mongoose = require('mongoose')
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')

const fridgeSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 255,
        required: true
    },
    owner: {
        type: String,
        max: 255,
        required: true
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

module.exports = mongoose.model('Fridge', fridgeSchema);