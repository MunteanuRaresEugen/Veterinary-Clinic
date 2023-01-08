import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Navbar.css";
export const Navbar = () => {
  return (
    <div className="sum">
      <div className="logo">
        <Link to="/">Veterinary Clinic</Link>
      </div>
      <nav className="item">
        <ul className="ul">
          <>
            <Link to="/login">Login</Link>
          </>
          <>
            <Link to="/register">Register</Link>
          </>
          <>
            <Link to="/view">View</Link>
          </>
          <>
            <Link to="/operations">Operations</Link>
          </>
        </ul>
      </nav>
    </div>
  );
};
