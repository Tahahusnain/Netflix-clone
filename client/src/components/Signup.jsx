import React from "react";
import netflixImage from "../image/netflixImage.jpg";
import { useState, useRef } from "react";
import { axiosClient } from "../config/axios";
// import jwt_decode from "jwt-decode";
// import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const passwordValidate = (pass) =>{
  console.log('pass',pass);
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9]).{5,}$/; // added 'i' flag for case-insensitivity
  console.log("Password =>",passwordRegex.test(pass))
  return passwordRegex.test(pass);
}

const Signup = () => {
  const [validUser , setValidUser] = useState(true)
  const [user, setUser] = useState(null);
  const emailRef = useRef(null);//useRef
  const passwordRef = useRef(null);//UseRef
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log("user =>>>", email, password);
    try{
      
      if( passwordValidate(password)){
        console.log("in axios postSubmit request");
        console.log("user =>>>", email, password);
        
        const res = await axiosClient.post(
          "/auth/signup",
          { email, password },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (res.status !== 200) {
          throw new Error("Failed to sign up: " + res.statusText);
        }
        console.log("res data user =>>>", res.data);
        setUser(res.data);
        Cookies.set("accessToken", res.data.accessToken,{
          httpOnly: true,
        });
        navigate("/browse")
      }else{
        // Password is invalid
        console.error("Password validation failed.");
        setValidUser(false)
        
      }
    }catch(error){
      console.log("error signing user", error.message)
    }

   // clearing ref
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  // console.log("Password validation", validUser)
  // console.log("User =>", user.accessToken);

  // const accessToken = user.accessToken
  // Cookies.set("accessToken", accessToken);

  // const axiosJWT = axios.create()

  // axiosJWT.interceptors.request.use(
  //     async(config)=>{
  //       let currentDate = new Date()
  //       const decodeToken = jwt_decode(user.accessToken)
  //       if(decodeToken.exp *1000 < currentDate.getTime()){

  //       }
  //     }
  // )
  const PasswordVisibility = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword);
  };

  return (
    <div className="main-signup">
      <img
        className="netflix-Img brightness-75"
        src={netflixImage}
        alt="Netflix"
      />

      <div className="netflix-svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="50"
          viewBox="0 0 1024 276.742"
        >
          <path
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
            fill="#d81f26"
          />
        </svg>
      </div>

      <div className="relative backdrop-brightness-50 bg-black/50 mx-auto mt-[25px] h-[650px] w-[30%] p-10 rounded ">
        <div className="signIn">
          <h1 className="text-3xl">Sign In</h1>
        </div>

        <form className="flex flex-col gap-5 mt-6 " onSubmit={handleSubmit}>
          <div className="email flex items-center">
            <input
              name="email"
              ref={emailRef}
              className="w-full h-14 bg-[#333333] email-input text-base px-4 pt-3 rounded"
              required
            />
            <label
              htmlFor="email"
              className="text-white left-14 absolute email-label"
            >
              Email
            </label>
          </div>

          <div className="password flex items-center">
            <input
              name="password"
              ref={passwordRef}
              className="pass-input w-full h-14 bg-[#333333] email-input text-base px-4 pt-3 rounded "
              type={showPassword ? 'text' : 'password'}
              required
            />
            <label
              htmlFor="Password"
              className="pass-label text-white left-14 absolute"
            >
              Password
            </label>
            <button onClick={PasswordVisibility} className=" absolute right-10 h-14 rounded-e bg-[#333333] text-white px-2 py-1 hover:bg-gray-700">
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          <button
            type="submit"
            className="bg-[#E50914] h-14 mt-8 text-white font-bold rounded hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
          <div>
            <a
              href="/LoginHelp"
              className="text-[#737373] hover:underline absolute right-10 -mt-4"
            >
              Need help?
            </a>
          </div>
        </form>

        <div className="login-others flex align-center mt-16">
          <p className="text-[#737373] text-lg mt-2">New to Netflix?</p>
          <a href="/" className="text-white text-lg mt-2 px-2">
            Sign up now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
