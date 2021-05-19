const nodemailer = require('nodemailer')

const Transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
        user: 'area.dev@outlook.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.Transporter = Transporter;