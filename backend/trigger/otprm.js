const cron = require('node-cron');
const {otprem} = require('../controllers/remove')

cron.schedule('*/10 * * * * *', async () => {
    otprem()
});

console.log('Expired OTP removal trigger scheduled');

