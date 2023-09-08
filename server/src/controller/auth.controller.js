import { signUp as _signUp, login as _login } from "../service/auth.service.js";
import {
  generateResetToken,
  resetPasswordToken,
} from "../service/resetPass.service.js";

export const signUp = async (req, res) => {
  try {
    console.log("in controller " + JSON.stringify(req.body));
    await _signUp(req, res);
  } catch (error) {
    console.log("in controller layer " + error);
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const log = await _login(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    console.log("in controller");
    console.log("in controller forget password " + JSON.stringify(req.body));
    await generateResetToken(req, res);
  } catch (error) {
    console.log("in catch  controller forget ");
    res.status(500).json({ message: error.message });
  }
};

//rest Password service 
export const resetPassword = async (req, res) => {
  console.log("reset password contoller");
  const { token } = req.params;
  console.log("token: " + token);
  try {
    await resetPasswordToken(token, req, res);
    //  console.log('res',res);
    if (res.headersSent !== true) {
      return res.send("Hello World!");
    }
    return res.status(200).json({ message: "Password Reset Successful" });
  } catch (error) {
    console.log("error message: ", error.message);
    if (error.message === "Token expired") {
      return res.status(400).json({ message: "Token expired" });
    } else {
      return res.status(500).send("Password reset failed");
    }
  }
};
