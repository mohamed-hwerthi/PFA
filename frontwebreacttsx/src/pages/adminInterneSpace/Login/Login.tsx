import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const LoginAdminInterne = () => {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft"></div>
        <div className="loginRight">
          <h2 className="logintitle">Sign in</h2>
          <form className="loginBox">
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              required
            />
            <input
              placeholder="Password"
              type="password"
              minLength={8}
              className="loginInput"
              required
            />

            <button className="loginButton" type="submit">
              Submit
            </button>

            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register ">
              <button className="loginRegisterButton">Register</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdminInterne;
