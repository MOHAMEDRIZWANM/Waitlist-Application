const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const user = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    joinWaitlist: {
        type: Boolean,
        default: false
    },
    winner: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    referralCode: {
        type: String,
        default: ""
    },
    couponCode: {
        type: String,
        default: ""
    },
    referredBy: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
user.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
    }
    next()
}) 

module.exports.user = mongoose.model('user',user)