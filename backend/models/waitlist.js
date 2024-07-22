const mongoose = require('mongoose');
const { user } = require('./user');
const {couponMail} = require('../controllers/couponmail')

const waitlistSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Waiting List"
    },
    users: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        position: {
            type: Number,
            required: true
        }
    }],
    contestCompleted: {
        type: Boolean,
        default: false
    }
    // count: {
    //     type: Number,
    //     default: 0
    // }
});

waitlistSchema.statics.assignPosition = async function(userId) {
    let waitlistDoc = await this.findOne({});
    if (!waitlistDoc) {
        waitlistDoc = new this({ users: [] });
    }
    console.log(waitlistDoc.contestCompleted)
    if(!waitlistDoc.contestCompleted) {
        const currentMaxPosition = waitlistDoc.users.length ? Math.max(...waitlistDoc.users.map(u => u.position)) : 98;
        const newPosition = currentMaxPosition + 1;
        waitlistDoc.users.push({ user: userId, position: newPosition });
        await waitlistDoc.save();
        return newPosition;
    }
    return "Contest Completed";
};

waitlistSchema.statics.updatePositions = async function(referrerId) {
    let waitlistDoc = await this.findOne({});
    if (!waitlistDoc) {
        waitlistDoc = new this({ users: [] });
    }
    if(waitlistDoc.contestCompleted){
        return "Contest Completed"
    }
    
    let userReachedPositionOne = null;
    waitlistDoc.users = waitlistDoc.users.map(u => {
        if (u.user.equals(referrerId)) {
            if (u.position !== 1) {
                u.position -= 1;
                if (u.position === 1) {
                    userReachedPositionOne = u;
                }
            }
        }
        return u;
    });
    
    if (userReachedPositionOne) {
        const userDetails = await this.getUserDetails(userReachedPositionOne.user);
        const { name, email } = userDetails;
        const userDoc = await user.findById(userReachedPositionOne.user);
        userDoc.winner = true;
        await userDoc.save();
        // waitlistDoc.count += 1
        // if(waitlistDoc.count == 5) {
        //     waitlistDoc.contestCompleted = true;
        // }
        waitlistDoc.contestCompleted = true;
        await couponMail(email, name);
        console.log(`User reached position 1: ${email}`);
    }
    await waitlistDoc.save();
};

waitlistSchema.statics.getUserDetails = async function(userId) {
    const waitlistDoc = await this.findOne({ 'users.user': userId }).populate('users.user');
    if (!waitlistDoc) {
        return null;
    }

    const userEntry = waitlistDoc.users.find(u => u.user._id.equals(userId));
    if (!userEntry) {
        return null;
    }

    const userDetails = {
        email: userEntry.user.email,
        name: userEntry.user.name,
        position: userEntry.position
    };

    return userDetails;
};

module.exports.waitlist = mongoose.model('waitlist', waitlistSchema);