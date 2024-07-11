//mailing module done using the nodemailer module
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config({
    path: '../.env'
})
//function for sending mail
module.exports.mailer = async(email, sub, txt, htm) => {
    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com", //mail host server
        port: 465, //port
        auth: { //mail authentication
            user: process.env.system_mail,
            pass: process.env.system_pass
        }
    });
    const mailops = {
        from: "Waitlist System <process.env.system_mail>",
        to: email,
        subject: sub,
        text: txt,
        html: htm, 
    }
    await transport.sendMail(mailops) //sending the email
}
