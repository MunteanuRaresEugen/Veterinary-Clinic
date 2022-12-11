import React, { useState } from "react";
import { Navbar } from "../Components/Navbar";
import "../Components/Styles/Login.css";
import { url } from "../utils";

const Login = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      email,
      password,
    };

    const res = await fetch(url + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      setIsSubmitted(true);
      const token = (await res.json()).token;
      localStorage.setItem("token", token);
    } else {
      setErrorMessages({ name: "pass", message: "Email or password invalid" });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {renderErrorMessage("mail")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" value={"Submit"} />
        </div>
      </form>
    </div>
  );
  return (
    <div>
      <Navbar />
      <div className="app">
        <div className="login-form">
          <div className="title">Sign In</div>
          {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        </div>
      </div>
    </div>
  );
};

export default Login;
