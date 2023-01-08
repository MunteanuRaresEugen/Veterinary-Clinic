import React from "react";
import { Navbar } from "../Components/Navbar";
import pic from "../photo.jpg";
import "../Components/Styles/View.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <br />

      <p>
        This is an university Project at databases course where we have to
        implement all the knowledge we gained throughout this course
        <br />
      </p>
      <div className="parent">
        <img
          className="child"
          src={pic}
          alt=""
          style={{
            padding: "100px",
            width: "500px",
          }}
        ></img>
      </div>
    </div>
  );
};

export default Home;
