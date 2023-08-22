import React from "react";
import Crown from "../image/The-crown.jpg";
import { useState } from "react";
import { axiosClient } from "../config/axios";
// import axios from "axios";

const LoginHelp = () => {
  // const client = axios.create("http://localhost:8000");

  const [email, setEmail] = useState("");
  const [sentEmail, setEmailSent] = useState(false);
  const [valid, setValid] = useState(false);

  const emailInput = document.getElementById("emailInput");
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setValid(false);
      emailInput.classList.remove("invalid-email");
      try {
        const res = await axiosClient.post(
          "/forgetpassword",
          { email },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );

        setEmailSent(true);
        setEmail("");
      } catch (e) {
        console.log(e.message);
      }
    } else {
      setValid(true);
      emailInput.classList.add("invalid-email");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <div className="flex main">
      <div className="background-image ">
        <img
          className="Crown-Img h-screen w-screen fixed object-cover"
          src={Crown}
          alt="Crown"
        />
      </div>

      <div className="header flex items-center justify-between p-4 w-full h-16">
        <div className="netflix-Svg ml-20">
          <a href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="45"
              viewBox="0 0 1024 276.742"
            >
              <path
                d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
                fill="#d81f26"
              />
            </svg>
          </a>
        </div>
        <div className="btn-signIn mr-20">
          <a
            href="/"
            role="button"
            className="font-bold text-xl text-[#E50914] px-4 py-2 hover:underline"
          >
            Sign in
          </a>
        </div>
      </div>

      <div className="Login-help flex items-center mx-auto my-20 h-auto justify-center absolute inset-0 max-w-[100%]">
        <div className="Login-help h-3/4 w-[450px]  bg-[#F3F3F3] flex flex-col p-6 rounded-sm">
          <div className="mt-5">
            <h1 className="text-center text-4xl font-[500] ">
              Forgot Email/Password
            </h1>
          </div>
          <div>
            <p className="mt-5 text-[#333333] text-[18px] my-4 ">
              We will send you an email with instructions on how to reset your
              password.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-email">
              <input
                type="text"
                id="emailInput"
                className="w-full h-12 rounded-sm px-3 py-2 text-[16px] block border border-[#B3B3B3] outline-[#B3B3B3]"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
                onClick={() => setEmailSent(false)}
                required
                onBlur={validateEmail}
              />
              <span className="absolute top-72.5 text-[12px] text-red-500">
                {valid && "Please enter a valid email"}
              </span>
            </div>
            <div className="input-email">
              <button className="w-full h-12 rounded-sm text-lg text-white mt-8 px-3 py-2 bg-[#0080ff] border-b-2 border-gray-500 block">
                Email Me
              </button>
              <div className="relative">
                <span className="absolute top-2 text-sm text-[#B00500]">
                  {sentEmail && "Password Reset Email Has Been Sent!"}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginHelp;
