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
        pass: '123456789Aa' // env var
    }
});
exports.Transporter = Transporter;

exports.sendConfirmation = function(email, link) {
    var mailOptions = {
        from: '"Freedgy" <area.dev@outlook.com>',
        to: email,
        subject: 'Account confirmation',
        text: link,
    };
    Transporter.sendMail(mailOptions).catch(error => {
        console.error(new Error(error));
    })
}