import {
  forgetPassword,
  login,
  resetPassword,
  signUp,
} from "../controller/auth.controller.js";

import express from "express";
const authRouter = express.Router();

authRouter.route("/auth/signup").post(signUp);
authRouter.route("/auth/login").post(login);
authRouter.route("/forgetpassword").post(forgetPassword);
authRouter.route("/password/:token").post(resetPassword);

export default authRouter;
