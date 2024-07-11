const mongoose = require('mongoose')

const otp = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    otp: {
        type: Number,
        require: true
    },
    expireAt: {
        type: Date,
        default: Date.now() + 5 * 60 * 1000
    }
})

module.exports.otp = mongoose.model('otp', otp)