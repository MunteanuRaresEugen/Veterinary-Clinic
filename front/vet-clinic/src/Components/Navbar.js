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
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/contat">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
