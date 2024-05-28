const nodemailer = require("nodemailer");

const sendEmail = (user) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'garrett.gerhold@ethereal.email',
        pass: 'wNKajm9BWxRJGFmmpp'
    }
  });

  const mailOptions = {
    from: "naima.recipe@gmail.com",
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
}

module.exports = sendEmail;
