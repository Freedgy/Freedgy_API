const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
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

module.exports = mongoose.model('User', userSchema);
