import React from "react";
import LoginForm from "../Components/LoginForm";
import LoginImg from "../Img/LoginPage img.png";

const Login = () => {
  return (
    <div className="h-screen flex">
      {/* Left side: Login Form */}
      <div
        className="w-1/2 flex flex-col justify-center items-center px-8"
        style={{ backgroundColor: "rgb(24, 39, 55)" }}
      >
        <h2
          className="text-4xl font-bold mb-6"
          style={{ color: "white" }}
        >
          Login
        </h2>
        <LoginForm />
      </div>

      {/* Right side: Image */}
      <div
        className="w-1/2 flex justify-center items-center"
        style={{ backgroundColor: "rgb(250, 246, 240)" }}
      >
        <img
          src={LoginImg}
          alt="Login"
          className="object-contain"
          style={{ border: "none", backgroundColor: "transparent" }}
        />
      </div>
    </div>
  );
};

export default Login;
