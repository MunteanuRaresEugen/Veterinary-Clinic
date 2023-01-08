import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import "../Components/Styles/Table.css";

const Operations = () => {
  return (
    <div>
      <Navbar />
      <p style={{ margin: "1px" }}>Operations that user can acces:</p>

      <div className="title">
        <Link
          to="/insertanimal"
          style={{
            color: "black",
            padding: "10px",
            fontSize: "20px",
          }}
        >
          Insert animal
        </Link>
      </div>
    </div>
  );
};

export default Operations;
