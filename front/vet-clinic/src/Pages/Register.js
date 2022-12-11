import React, { useState } from "react";
import { Navbar } from "../Components/Navbar";
import "../Components/Styles/Login.css";
import { url } from "../utils";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnp, setCnp] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  // verificari campuri
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registered");
    const body = JSON.stringify({
      FirstName: fname,
      LastName: lname,
      Age: age,
      Email: email,
      Password: password,
      CNP: cnp,
    });
    const response = await fetch(`${url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (response.status === 201) {
      setIsSubmitted(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      console.log("Succes register");
    } else {
      alert("Errrrr");
    }
  };

  const renderForm = (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>First Name</label>
          <input
            type="text"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Last Name </label>
          <input
            type="text"
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Age</label>
          <input
            type="number"
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Email </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>CNP</label>
          <input
            type="text"
            onChange={(e) => setCnp(e.target.value)}
            size={13}
            required
          />
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
      <br />
      <div className="app">
        <div className="login-form">
          <div className="title">Register</div>
          {isSubmitted ? <div>User added successfully</div> : renderForm}
        </div>
      </div>
    </div>
  );
};

export default Register;
