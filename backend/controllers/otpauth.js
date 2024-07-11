const {user} = require('../models/user')
const {otp} = require('../models/otp')
const crypto = require('crypto')
const send = require('./otpservice')
const {waitlist} = require('../models/waitlist')
const {mailer} = require('./mailer')

function genReferralCode() {
    return crypto.randomBytes(4).toString('hex').toUpperCase();
}

module.exports.verifyOTP = async (req, res) => {
    try { //verifying the OTP for adding the user to the waitlist
        const { otp: inputOtp } = req.body;
        const { email } = req.cookies;
        const otpRecord = await otp.findOne({ email, otp: inputOtp });
        if (!otpRecord) {
            return res.status(400).send('Invalid or expired OTP');
        }
        if (otpRecord.expireAt < new Date()) {
            await otp.deleteOne({ email, otp: inputOtp });
            return res.status(400).send('OTP has expired');
        }
        const userRecord = await user.findOne({ email });
        if (userRecord) {
            userRecord.verified = true;
            const newPosition = await waitlist.assignPosition(userRecord._id)
            if(newPosition !== "Contest Completed") {
                console.log(`User added to waitlist with position ${newPosition}`)
                userRecord.joinWaitlist = true;
                referralc = genReferralCode()
                userRecord.referralCode = referralc
                const sub = 'Referral Code'
                const txt = `Congratulations!\nYour Account have been verified. The referral code is ${referralc}. And your position is ${newPosition}`
                const htm = `<p>Congratulations!<br/>Your Account have been verified. The referral code is ${referralc}. And your position is ${newPosition}</p>`
                await mailer(email, sub, txt, htm)
                console.log(`Referral Code sent to ${email}: ${referralc}`);
            } else {
                console.log('Contest Completed')
                userRecord.joinWaitlist = false
                const sub = 'Contest Completed'
                const txt = `Sorry for the inconvience caused!\nThe constest have been completed better luck next time.\nWith Regards,\nWaitlist Team`
                const htm = `<p>Sorry for the inconvience caused!<br/>The constest have been completed better luck next time.<br/>With Regards,<br/>Waitlist Team</p>`
                await mailer(email, sub, txt, htm)
            }
            if (userRecord.referredBy) {
                const referrer = await user.findOne({ referralCode: userRecord.referredBy });
                if (referrer) {
                    const temp = await waitlist.updatePositions(referrer._id);
                    if(temp === "Contest Completed") {
                        console.log('Referrer not updated. Since Contest Completed')
                    } else {
                        console.log(`Updated position for referrer: ${referrer.email}`);
                    }
                }
            }
            userRecord.referredBy = ""
            await userRecord.save();
            await otp.deleteOne({ email, otp: inputOtp }); 
            if(newPosition !== "Contest Completed") {
                return res.status(200).send('Account verified and added to waitlist successfully. Referral Code is mailed to your mail');
            } else {
                console.log('Contest Completed')
                return res.status(200).send('Contest Completed');    
            }
        }
        res.status(404).send('User not found');
    } catch (error) {
        console.error('Error during OTP verification: ', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.resendOtp = async(req,res) => {
    try { //resending the OTP incase of OTP expiry 
        const {email} = req.cookies
        await send.sendOTP(email)
        res.send('Resend OTP successfull') 
    }
    catch(error) {
        console.error('Error sending otp: ', error)
        res.send('Internal Server Error')
    }
}