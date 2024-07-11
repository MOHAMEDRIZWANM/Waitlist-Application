const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({
    path: "../.env"
})

module.exports.isAdminAuth = async(req, res, next) => { //admin authenciation for accessing the data with jwt token
    const token = req.cookies.token 
    if (!token) {
        return res.status(401).send('Access Denied')
    }
    try {
        const decode = jwt.verify(token, process.env.jwt_secret)
        req.user = decode
        next()
    } catch (error) {
        res.status(400).send('Invalid token')
    }
}