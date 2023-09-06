import bcrypt from "bcrypt";
const saltRounds = 10;
import "dotenv/config";
import {
  createToken,
  deleteToken,
  findUserByEmail,
  findUserById,
  getUserByResetToken,
  updateUserPassword,
} from "../repositories/auth.repository.js";
import { sendPasswordResetEmail } from "../mailer/nodemailer.js";
import { v4 as uuidv4 } from "uuid";

export const passwordValidate = (pass) => {
  // Password regex validation
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-12]).{5,}$/;
  return passwordRegex.test(pass);
};

export const generateResetToken = async (req, res) => {
  try {
    const { email } = req.body;
    const resetToken = uuidv4();
    const currentTime = new Date();
    const expiration = new Date(currentTime.getTime() + 30 * 60 * 1000);
    console.log(expiration);
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetEntryToken = {
      user: user._id,
      token: resetToken,
      expiresAt: expiration,
    };
    await createToken(resetEntryToken);

    sendPasswordResetEmail(email, resetToken);

    return res
      .status(200)
      .json({ message: "Reset token generated successfully" });
  } catch (e) {
    console.log(e + " in reset service layer");
    return res
      .status(500)
      .json({ message: "Error resetting the password.", error: e.message });
  }
};

export const resetPasswordToken = async (token, req, res) => {
  const currentTime = new Date().getTime();

  console.log("reset pass ");
  console.log(token);
  const user = await getUserByResetToken(token);
  console.log("user=>", user);
  console.log("time=>", user.expiresAt.getTime() + " => c time" + currentTime);
  if (!user) {
    throw new Error("Invalid or expired token");
  }
  //console.log('gain token and user', user);
  if (currentTime > user.expiresAt.getTime()) {
    console.log("in current expire if");
    throw new Error("Token expired");
  }

  const password = req.body.confirmPass;
  console.log(passwordValidate(password), password);
  if (!passwordValidate(password)) {
    console.log("invalid password");
    return "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
  }

  const userId = user.user.toString();
  const validUser = await findUserById(userId);
  console.log("user identity valid ", validUser);
  //hashing new password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await updateUserPassword(userId, hashedPassword);

  const deletedToken = await deleteToken(token);

  if (deletedToken) {
    console.log("token deleted", deletedToken);
  } else {
    console.log("token not deleted");
  }
};
