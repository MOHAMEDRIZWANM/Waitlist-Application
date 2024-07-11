const {otp} = require('../models/otp')
const { mailer } = require('./mailer')

module.exports.sendOTP = async (email) => {
    try { 
        const otpval = Math.floor(100000 + Math.random() * 900000)
        const newotp = new otp({
            email,
            otp: otpval,
            expireAt: new Date(Date.now() + 5 * 60 * 1000)
        }) 
        await newotp.save()
        console.log(email) 
        sub = 'OTP Code for Account Verification'
        txt = `Sign in to your account and verify your account by entering the OTP to join the waiting list.\n.Your OTP code for account verification is ${otpval}. It will expire in 5 minutes.`
        htm = `<p>Sign in to your account and verify your account by entering the OTP to join the waiting list.<br>Your OTP code is ${otpval}. It will expire in 5 minutes.</p>`
        await mailer (email, sub, txt, htm)
        console.log(`OTP sent to ${email}: ${otpval}`);
    }
    catch(error) {
        console.error('Error Sending OTP: ', error)
    }
}

