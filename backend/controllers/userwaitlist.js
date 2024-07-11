const { user } = require('../models/user');
const { waitlist } = require('../models/waitlist');

module.exports.getLeaderboard = async (req, res) => {
    try {
        const waitlistDoc = await waitlist.findOne({}).populate('users.user', 'name');
        if (!waitlistDoc) {
            return res.status(404).send('Waitlist not found');
        } 
        const leaderboard = waitlistDoc.users
            .map((u, index) => ({
                serialNumber: index + 1,
                name: u.user.name,
                position: u.position
            }))
            .sort((a, b) => a.position - b.position);

        res.status(200).send(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.getwinner = async (req, res) => {
    try {
        const userDoc = await user.findOne({ email: req.user.email });
        if (!userDoc) {
            return res.status(404).send('Error fetching details');
        }

        if (userDoc.winner) {
            return res.status(200).json({
                name: userDoc.name,
                couponCode: userDoc.couponCode,
                winner: userDoc.winner
            });
        }
        return res.status(200).send('Not a winner');
    } catch (error) {
        console.error('Error getting Winner: ', error);
        return res.status(500).send('Internal Server Error');
    }
};
