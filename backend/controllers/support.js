const dotenv = require('dotenv')
const nodemailer = require('nodemailer')

dotenv.config({
    path: '../.env'
})

module.exports.supportTicket = async(req, res) => {
    try {
        const { name, email, sub, txt } = req.body
        const htm = `<p>${txt}</p>`
        var transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: process.env.system_mail,
                pass: process.env.system_pass
            }
        })
        const mailops = {
            from: `${name} <${email}>`,
            to: "mohamedrizwanm.21aid@kongu.edu",
            replyTo: `${email}`,
            subject: `Support Ticket - ${sub}`,
            text: txt,
            html: htm, 
        }
        await transport.sendMail(mailops)
        const clientMailOps = {
            from: 'Waitlist Team <process.env.system_mail>',
            to: email,
            replyTo: "mohamedrizwanm.21aid@kongu.edu",
            subject: "Re: " + `Support Ticket - ${sub}`,
            text: "Thank you for reaching out. We have received your support ticket and will get back to you shortly.",
            html: "<p>Thank you for reaching out. We have received your support ticket and will get back to you shortly.</p>"
        };
        await transport.sendMail(clientMailOps);
        res.send("Support ticket raised")
    } catch (error) {
        console.error('Error in support ticket: ', error)
        res.send('Internal Server Error')
    }
}