import pkg from "jsonwebtoken";
const { sign } = pkg;
import "dotenv/config";


export const generateAccessToken = (newUser)=>{
    return sign({ userId: newUser._id, email: newUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "1 day" })
  }

export const generateRefreshToken = (newUser)=>{
    return sign({ userId: newUser._id, email: newUser.email }, process.env.SECRET_KEY);
}

