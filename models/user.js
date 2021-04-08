const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 255
    },
    email: {
        type: String,
        max: 255
    },
    password: {
        type: String,
        min: 8,
        max: 255
    },
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
