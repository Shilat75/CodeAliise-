import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import videoSource from "../LandingPage/v1.mp4";
import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter email and password");
    }
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, password }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };

  return (
    <section className="auth-section">
      <video className="background-video" src={videoSource} autoPlay loop muted />
      {isSignup && <AboutAuth />}
      <div className="auth-container">
        <div className="auth-content">
          <h2>{isSignup ? 'Create Account' : 'Sign In'}</h2>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <label htmlFor="name">
                <h4>Display Name</h4>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </label>
            )}
            <label htmlFor="email">
              <h4>Email</h4>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label htmlFor="password">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>Password</h4>
                {!isSignup && (
                  <p style={{ color: "#007ac6", fontSize: "13px" }}>
                    forgot password?
                  </p>
                )}
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <button type="submit" className="auth-btn">
              {isSignup ? "Sign up" : "Log in"}
            </button>
          </form>
          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              className="handle-switch-btn"
              onClick={handleSwitch}
            >
              {isSignup ? "Log in" : "sign up"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Auth;
