import { createRefreshToken } from "../repositories/auth.repository.js";
import { findRefreshToken } from "../repositories/auth.repository.js";
import { findUserById } from "../repositories/auth.repository.js";
import jwt from "jsonwebtoken";

import "dotenv/config";
import { generateAccessToken } from "../Token/tokens.js";

export const refToken = async (userId, newRefreshToken) => {
    const token = {
        user: userId,
        RefreshToken: newRefreshToken
    }
    // Assuming createRefreshToken is an asynchronous operation
     await createRefreshToken(token);
};

// using refresh token to provide access token again 
// & find the user related to the refresh token and provide access token
export const findUserRefreshToken = async (refreshToken, res)=>{
    const userToken = await findRefreshToken(refreshToken);
    if(userToken){
        console.log("User refresh token found =>", userToken._id);
        const userId = userToken.user.toString();
        // const validUser = await findUserById(userId);
        console.log("user id found ", userId)
        const AssociatedUserByToken = await findUserById(userId)
        const userAccessToken = {
            _id: AssociatedUserByToken._id,
            email: AssociatedUserByToken.email
        };
        console.log("searched in service layer ==>",AssociatedUserByToken);
        
        return new Promise((resolve, reject) => {
            jwt.verify(userToken.RefreshToken, process.env.SECRET_KEY, (err) => {
              if (err) {
                
                console.log("Error in JWT verification:", err);
                reject(err); // Reject the promise if there's an error
              } else {
                const newAccessToken = generateAccessToken(userAccessToken);
                console.log("Access token =>", newAccessToken);
                resolve(newAccessToken); // Resolve the promise with the newAccessToken
              }
            });
          });

    }else{
        return res.status(404).json({ error: "Refresh token not found" });
    }
}
