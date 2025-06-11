const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL_USER,
        pass: process.env.SMTP_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Blazexsam" <blazesam275@gmail.com>',
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
