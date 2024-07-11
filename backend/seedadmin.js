const mongoose = require('mongoose');
const { admin } = require('./models/adminuser'); 

const seedAdmin = async () => {
    const email = "mohamedrizwanm.21aid@kongu.edu";
    const password = "rizwan";
    const existingAdmin = await admin.findOne({ username: email });
    if (existingAdmin) {
        console.log('Admin already exists');
        return;
    }
    const newAdmin = new admin({
        username: email,
        password: password,
        role: 'superadmin' 
    });
    await newAdmin.save();
    console.log('Admin seeded successfully');
};

mongoose.connect('mongodb://localhost:27017/waitlist')
.then(() => {
    console.log('MongoDB connected');
    return seedAdmin();
})
.then(() => {
    mongoose.disconnect();
    console.log('MongoDB disconnected');
})
.catch(err => {
    console.error('Error: ', err);
});
