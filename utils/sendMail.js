import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user:process.env.MAIL_USERNAME, // generated ethereal user
      pass:process.env.MAIL_PASSWORD// generated ethereal password
    },
  });

export default transporter
