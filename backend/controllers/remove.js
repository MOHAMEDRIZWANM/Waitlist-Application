const {otp} = require('../models/otp')
const {user} = require('../models/user')

module.exports.otprem = async() => {
    try { //function removes the expired OTP after 5 minutes
        const result = await otp.deleteMany({
            expireAt: {
                $lt: new Date()
            }
        });
        if (result.deletedCount > 0) {
            console.log(`Deleted ${result.deletedCount} expired OTPs`);
        }
    } catch (error) {
        console.error('Error deleting OTP: ', error);
    }
}

module.exports.userrem = async() => {
    try { //functions removes the unverified users after one day
        const thresholdDate = new Date(Date.now() - 24 * 60 * 60 * 1000); 
        const result = await user.deleteMany({ verified: false, createdAt: { $lt: thresholdDate } })
        if (result.deletedCount > 0) {
            console.log(`Deleted ${result.deletedCount} unverified accounts`);
        }
    } catch (error) {
        console.error("Error deleting Account: ", error);
    }
}