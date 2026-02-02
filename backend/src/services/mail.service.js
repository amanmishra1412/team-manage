const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GOOGLE_APP_MAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});

module.exports = transporter;
