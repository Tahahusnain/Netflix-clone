import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

 const tokenExpired = (token)=>{
    if (!token) return false;
    const decodedToken = jwt_decode(token);
    console.log(decodedToken)
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp > currentTime;
 }

const ProtectedRoutes = () => {
    console.log("In protected routes")
    const accessToken = Cookies.get('accessToken')
    const isAuthenticated = !!accessToken && tokenExpired(accessToken) 
    
    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/signup" /> 
    )

}
export default ProtectedRoutes
