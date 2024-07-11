const express = require('express')
const router = express.Router()
const usercontrol = require('./controllers/userlogin')
const otpauth = require('./controllers/otpauth')
const forgotPass = require('./controllers/forgotpass')
const support = require('./controllers/support')
const getwaitlist = require('./controllers/userwaitlist')
const {isUserAuth} = require('./middleware/userauth')
const {adminlogin} = require('./controllers/adminlogin')
const admin = require('./controllers/admincontrol')
const {isAdminAuth} = require('./middleware/adminauth')
const {getDetails} = require('./controllers/useraccount')

//user sign in and sign up operations routes
router.post('/signup', usercontrol.signup)
router.post('/signin', usercontrol.signin)

//otp verification operations routes
router.post('/verify-otp',otpauth.verifyOTP)
router.post('/resend-otp', otpauth.resendOtp)

//password reset operations routes
router.post('/forgotpass', forgotPass.passOtp)
router.post('/passotp', forgotPass.verifyResPass)
router.post('/resetpass', forgotPass.resetPass)

//support ticket handling operation  route
router.post('/support', support.supportTicket)

//waitlist handling operation route  
router.post('/waitlist',isUserAuth,getwaitlist.getLeaderboard)
router.post('/winner', isUserAuth, getwaitlist.getwinner)
router.post('/account-details', isUserAuth, getDetails)

//admin operations routes
router.post('/adminlogin', adminlogin)
router.post('/admin-get-users', isAdminAuth, admin.getallusers)
router.post('/admin-user-verify', isAdminAuth, admin.verifyUser)
router.post('/admin-update-user', isAdminAuth, admin.updateUser)
router.post('/admin-del-user', isAdminAuth, admin.deleteUser)

module.exports = router;