const nodemailer = require("nodemailer");

const sendResetEmail = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const resetLink = `http://localhost:3000/resetpassword/${resetToken}`;

  const mailOptions = {
    from: "talkieteam27@gmail.com",
    to: email,
    subject: "Reset Password",
    html: `<h3>Hello user,</h3><p>Click the link below to reset your password:</p><a href="${resetLink}"><u>Reset Link</u></a><br><p>The reset link is valid for 30 minutes.</p><h4>Have a Good Day</h4><br><p>Regards,<br>Team Talkie<p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;
