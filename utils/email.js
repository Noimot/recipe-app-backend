const nodemailer = require("nodemailer");

const sendEmail = (user) => {
  console.log('Sending email')
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "naima.recipe@kloudlot.com",
      pass: "Abbey@23",
    },
  });
  console.log('Sending email.......')
  const mailOptions = {
    from: "naima.recipe@kloudlot.com",
    to: user.email,
    subject: "Naima Recipe Signup Notification",
    text: `Dear ${user.name}, thank you for signing up on Naima Recipe App!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendEmail;
