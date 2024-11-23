const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true, 
  port: 465,
});

async function sendMail(to, sub, msg, text="!!!!!!!!!!!!!!!!"){
    try {
        await transporter.sendMail({
            from: '"Hệ thống vườn thông minh! 👻" <lminhkhanh231@gmail.com>',
            to: to,
            subject: sub,
            html: msg,
            text: text
        });
        console.log("Send mail sucsecfully!")
    } catch (error) {
        console.log("Connection wifi failed!", error);
    }
}

module.exports = sendMail;
