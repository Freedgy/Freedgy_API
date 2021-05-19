const mongoose = require('mongoose')

const resetRequestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 3600
    }
},{
    timestamps: true
});

module.exports = mongoose.model('ResetRequest', resetRequestSchema);