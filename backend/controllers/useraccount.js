const {user} = require('../models/user')

module.exports.getDetails = async (req, res) => {
    try {
        const userDoc = await user.findOne({email: req.user.email})
        if(!user) {
            res.send('Error fetching user')
        }
        res.status(200).json({
            name: userDoc.name,
            email: userDoc.email, 
            referralCode: userDoc.referralCode
        })
    } catch (error) {
        console.error('Error fetching details: ', error)
        res.send('Internal server error')
    }
}