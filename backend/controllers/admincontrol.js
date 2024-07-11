const {user} = require('../models/user')
const {waitlist} = require('../models/waitlist')
const {mailer} = require('./mailer')
const crypto = require('crypto')

function genReferralCode() {
    return crypto.randomBytes(4).toString('hex').toUpperCase();
}

module.exports.getallusers = async (req, res) => {
    try {
        const users = await user.find().select('-password -createdAt -joinWaitlist');

        if (!users) {
            return res.status(404).send('No users found');
        }

        const waitlistDoc = await waitlist.findOne({}).populate('users.user');

        const verifiedUsersWithPosition = users
            .filter(userDoc => userDoc.verified)
            .map(userDoc => {
                let userPosition = '-';
                if (waitlistDoc && waitlistDoc.users) {
                    const wlUser = waitlistDoc.users.find(wlUser => wlUser.user && wlUser.user._id.equals(userDoc._id));
                    if (wlUser) {
                        userPosition = wlUser.position;
                    }
                }
                return {
                    ...userDoc.toObject(),
                    position: userPosition
                };
            });

        const unverifiedUsers = users.filter(userDoc => !userDoc.verified);

        res.status(200).send({
            verifiedUsers: verifiedUsersWithPosition,
            unverifiedUsers: unverifiedUsers
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send(`Error fetching users: ${error.message}`);
    }
};


module.exports.verifyUser = async (req, res) => {
    try {
        const {email} = req.body
        const userRecord = await user.findOne({ email });
        if (userRecord) {
            userRecord.verified = true;
            const newPosition = await waitlist.assignPosition(userRecord._id)
            if(newPosition !== "Contest Completed") {
                console.log(`User added to waitlist with position ${newPosition}`)
                userRecord.joinWaitlist = true
                referralc = genReferralCode()
                userRecord.referralCode = referralc
                const sub = 'Referral Code'
                const txt = `Congratulations!\nYour Account have been verified by the administrator. The referral code is ${referralc}. And your position is ${newPosition}\nWith Regards,\nWaitlist Team`
                const htm = `<p>Congratulations!<br/>Your Account have been verified by the administrator. The referral code is ${referralc}. And your position is ${newPosition}<br/>With Regards,<br/>Waitlist Team</p>`
                console.log('mailing....')
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
            if(newPosition !== "Contest Completed") {
                return res.status(200).send('Account verified and added to waitlist successfully. Referral Code is mailed to the client mail');
            } else {
                console.log('Contest Completed')
                return res.status(200).send('Contest Completed');    
            }
        }
        res.status(404).send('User not found');
    } catch (error) {

    }
}

// Update user details
module.exports.updateUser = async (req, res) => {
    try {
        const { email, userDetails } = req.body;
        const allowedUpdates = ['name', 'email'];
        const updates = {};
        allowedUpdates.forEach(field => {
            if (userDetails[field]) {
                updates[field] = userDetails[field];
            }
        });
        const updatedUser = await user.findOneAndUpdate({ email }, updates, { new: true, select: '-password -createdAt -joinWaitlist -winner -verified -referralCode -couponCode -referredBy' });
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        sub = 'Account update'
        txt = 'Your account details have been updated by the administrator as per your request. If there is supusicous activity, please reach out our support in out website.\nWith Regards,\nWaitlist Team.'
        htm = '<p>Your account details have been updated by the administrator as per your request. If there is supusicous activity, please reach out our support in out website.<br/>With Regards,<br/>Waitlist Team.</p>'
        await mailer(updatedUser.email, sub, txt, htm)
        res.status(200).send('User updated');
    } catch (error) {
        res.status(500).send(`Error updating user: ${error.message}`);
    }
};


module.exports.deleteUser = async (req, res) => {
    try {
        const {email} = req.body
        const userDoc = await user.findOne({ email });
        if (!userDoc) {
            return res.status(404).send('User not found');
        }
        const waitlistDoc = await waitlist.findOne({});
        if (waitlistDoc) {
            waitlistDoc.users = waitlistDoc.users.filter(wlUser => !wlUser.user.equals(userDoc._id));
            await waitlistDoc.save();
        } 
        await user.deleteOne({ email });
        res.status(200).send(`User deleted successfully.`);
    } catch(error) {
        res.send('Error deleting user: ', error)
    }
}