import ResetToken from "../models/ResetToken.js";
import User from "../models/User.js";

export const createUser = async (userData) => User.create(userData);

export const findUserByEmail = async (email) => User.findOne({ email });

export const createToken = async (tokenData) => ResetToken.create(tokenData);

export const findUserById = async (userId) => {
  console.log("user id in repo =>", userId);
  return User.findById({ _id: userId });
};

export const getUserByResetToken = async (token) => {
  console.log("getUserByResetToken => querying for token:", token);
  return ResetToken.findOne({ token }); // Use { token } instead of just token
};

export const updateUserPassword = async (userId, newPassword) =>
  User.findOneAndUpdate(
    { _id: userId },
    { password: newPassword },
    { new: true }
  );

export const deleteToken = async (token) => {
  const tokenDeleted = await ResetToken.findOneAndDelete({ token });
  return tokenDeleted ? true : false;
};
