const {user} = require('../models/user')
const {otp} = require('../models/otp') 
const {mailer} = require('./mailer')

module.exports.passOtp = async (req, res) => {
    try {
        const email = req.body.email
        const u = await user.findOne({email})
        if(u) {
            const otpval = Math.floor(100000 + Math.random() * 900000)
            const newotp = new otp({
                email,
                otp: otpval,
                expireAt: new Date(Date.now() + 5 * 60 * 1000)
            }) 
            await newotp.save()
            sub = "Password Reset OTP"
            txt = `Your OTP code for password reset is ${otpval}. It will expire in 5 minutes.\nYou made an request for password reset. If it not you, please ignore this mail.\nWith Regrads,\nWaitlist Team`
            htm = `<p>Your OTP code for password reset is ${otpval}. It will expire in 5 minutes.<br/>You made an request for password reset. If it not you, please ignore this mail.<br/>With Regrads,<br/>Waitlist Team</p>`
            await mailer(email, sub, txt, htm)
            res.cookie('email', email, {maxAge: 20 * 60 * 1000, httpOnly: true})
            return res.send("OTP Send Successful")
        }
        return res.send("No user data found")
    } catch(error) {
        console.error("Error occured in sending pass otp: ", error)
        return res.send("Internal Server Error")
    }
}

module.exports.verifyResPass = async (req, res) => {
    try {
        const inputOtp = req.body.otp;
        const { email } = req.cookies;
        const otpRecord = await otp.findOne({ email, otp: inputOtp });
        if (!otpRecord) {
            return res.status(400).send('Invalid or expired OTP');
        }
        if (otpRecord.expireAt < new Date()) {
            await otp.deleteOne({ email, otp: inputOtp });
            return res.status(400).send('OTP has expired');
        }
        await otp.deleteOne({ email, otp: inputOtp });
        res.cookie('email', email, { maxAge: 20 * 60 * 1000, httpOnly: true });
        return res.status(200).send("OTP Verified Successfully");
    } catch (error) {
        console.error("Error occurred in verifying OTP: ", error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports.resetPass = async(req, res) => {
    try {
        const newPassword = req.body.password;
        const { email } = req.cookies
        const u = await user.findOne({ email });
        if (u) {
            u.password = newPassword
            await u.save()
            sub = "Password Reset Successful"
            txt = `Dear ${u.name},\nYour Password have been resetted successfully.\n\nWith Regards\nWaitlist Team`
            htm = `<p>Dear ${u.name},<br/>Your Password have been resetted successfully.<br/><br/>With Regards<br/>Waitlist Team</p>`
            await mailer(email, sub, txt, htm)
            return res.status(200).send("Password reset successfully")
        }
        return res.status(400).send("Problem Occurred. Try after some time.");
    } catch (error) {
        console.error("Error occurred in resetting password: ", error);
        return res.status(500).send("Internal Server Error");
    }
}