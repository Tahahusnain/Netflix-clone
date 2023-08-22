import { createTransport } from "nodemailer";
import "dotenv/config";

const transporter = createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

export function sendPasswordResetEmail(email, resetToken) {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${process.env.RESET_URL}/${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
