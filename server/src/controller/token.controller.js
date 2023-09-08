import { findUserRefreshToken } from "../service/refreshToken.service.js"

export const refToken = async (req, res)=>{
    console.log("Hello in controller refresh token")
    console.log(req.body.refreshToken)
    const refreshToken = req.body.refreshToken

    try{
        const find = await findUserRefreshToken(refreshToken)
        console.log("in controller getting ",find)
       // console.log("In controller user ==>",find.userToken.user)
        //Find the user associated with the access token as we got the user related to the refresh token
        return res.status(200).json({ accessToken: find });
    }catch(error){
        console.error("error in controller token ", error)
       return res.status(404).json({error:'Not Found'});
    }   

}