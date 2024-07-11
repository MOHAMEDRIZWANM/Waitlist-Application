const cron = require('node-cron');
const user = require('../models/user'); 
const {userrem} = require('../controllers/remove')

cron.schedule('*/10 * * * * *', async () => { 
    userrem()
});

console.log('Expired User removal trigger scheduled');