import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../utils";
import { Navbar } from "../Components/Navbar";

const InsertAnimal = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [weight, setWeight] = useState("");
  const [ownerid, setOwnerid] = useState("");
  const [speciesid, setSpeciesid] = useState("");
  const [vaccinated, setIsVaccinated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = JSON.stringify({
      Name: name,
      DateofBirth: birth,
      Weight: weight,
      OwnerID: ownerid,
      SpeciesID: speciesid,
      Vaccinated: vaccinated,
    });

    const response = await fetch(`${url}/animals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (response.status === 201) {
      setIsSubmitted(true);
      setTimeout(() => {
        navigate("/operations");
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
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Birth Date</label>
          <input
            type="text"
            onChange={(e) => setBirth(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Weight</label>
          <input
            type="text"
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Species ID</label>
          <input
            type="text"
            onChange={(e) => setSpeciesid(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Owner ID</label>
          <input
            type="text"
            onChange={(e) => setOwnerid(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Vaccinated </label>
          <input
            type="text"
            onChange={(e) => setIsVaccinated(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <input type="submit" value={"Insert"} />
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
          <div className="title">Insert Animal</div>
          {isSubmitted ? <div>Animal inserted successfully</div> : renderForm}
        </div>
      </div>
    </div>
  );
};

export default InsertAnimal;
