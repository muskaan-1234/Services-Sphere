const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  secure: true,
  logger: false,
  debug: true,
  secureConnection: false,
  auth: {
    user: 'muskaan.in2808@gmail.com',
    pass: 'lpsjusfycedfnjti',
  },
  tls: {
    rejectUnauthorized: true
  }
});

async function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent:', info.response);
        resolve(info);
      }
    });
  });
}

module.exports = sendEmail;
