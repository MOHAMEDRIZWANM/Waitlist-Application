const crypto = require('crypto');
const { user } = require('../models/user');
const { mailer } = require('./mailer')

function generateCouponCode(length = 8) {
    return crypto.randomBytes(length).toString('hex').slice(0, length).toUpperCase();
}

module.exports.couponMail = async (email, name) => {
    try {
        const couponCode = generateCouponCode();
        const userDoc = await user.findOne({ email });
        userDoc.couponCode = couponCode;
        await userDoc.save();
        sub = 'Coupon Code for the Brand New IPhone 16 Pro Max'
        txt = `Congratulations ${name}!\nYou Won the Contest. Your Coupon Code is COUPON-${couponCode}\nWith Regards,\nWaitlist Team`
        htm = `<p>Congratulations ${name}!<br>You Won the Contest. Your Coupon Code is <strong>COUPON-${couponCode}</strong><br>With Regards,<br>Waitlist Team</p>`
        await mailer(email, sub, txt, htm)
        console.log(`Coupon code email sent to ${email}`);
    } catch (error) {
        console.error('Error sending coupon code email:', error);
    }
};
