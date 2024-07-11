const {admin} = require('../models/adminuser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config({
    path: '../.env'
})

module.exports.adminlogin = async (req,res) => {
    try {
        const { email, password } = req.body;
        const admindoc = await admin.findOne({ username: email });
        if (!admindoc) {
            return res.status(401).send("Invalid admin email");
        }
        const isadmin = await bcrypt.compare(password, admindoc.password);
        console.log(isadmin)
        if(!isadmin) {
            return res.send("Invalid password")
        }
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.jwt_cookie_expiry * 24 * 60 * 60 * 1000)
        }
        const token = jwt.sign({email}, process.env.jwt_secret, {
            expiresIn: process.env.jwt_expiry
        })
        res.cookie('token', token, cookieOptions)
        res.send('Admin Signed in Successfully')
    } catch (error) {
        console.error('Error admin sign in: ', error)
        res.send('Internal server error')
    }
}