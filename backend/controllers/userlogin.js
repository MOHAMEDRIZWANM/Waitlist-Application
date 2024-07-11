const {user} = require('../models/user')
const {sendOTP} = require('./otpservice')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config({
    path: '../.env'
})

module.exports.signup = async (req, res) => {
    try {
        const exist = await user.findOne({email: req.body.email})
        if(exist) {
            return res.send('Account User Already exists')
        }
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        if (req.body.referredBy) {
            userData.referredBy = req.body.referredBy;
        }
        const u = new user(userData);
        await u.save();
        res.cookie('email', req.body.email, {maxAge: 20 * 60 * 1000, httpOnly: true})
        await sendOTP(req.body.email) 
        res.status(200).send('Successfully signed up. Verify OTP') 
    } catch(error) {
        console.error('Error during signup: ',error)
        res.send("Internal Server Error!")
    }
}

module.exports.signin = async(req, res) => {
    try {
        const { email, password } = req.body;
        const account = await user.findOne({ email })
        if(!account) {
            return res.send('Account not found!')
        }
        const isPassword = await bcrypt.compare(password, account.password)
        if (!isPassword) {
            return res.send('Wrong Password!')
        }
        const status = account.verified
        if (!status) {
            res.cookie('email', email, {maxAge: 20 * 60 * 1000, httpOnly: true})
            await sendOTP(email) 
            return res.send('Account Not Verified')
        }
        const token = jwt.sign({ email: account.email }, process.env.jwt_secret, {
            expiresIn: process.env.jwt_expiry
        })
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.jwt_cookie_expiry * 24 * 60 * 60 * 1000)
        }
        res.cookie('token', token, cookieOptions)
        res.status(200).send('Signed in Successfull')
    } catch(error) {
        console.error('Error in user sign in: ', error)
        res.send('Internal server error')
    }
}