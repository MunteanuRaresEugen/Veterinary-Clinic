import { Navbar } from "../Components/Navbar";
import "../Components/Styles/Table.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../utils";

const Operations = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [weight, setWeight] = useState("");
  const [ownerid, setOwnerid] = useState("");
  const [speciesid, setSpeciesid] = useState("");
  const [vaccinated, setIsVaccinated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clickinsertAnimal, setInsertAnimal] = useState(false);

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
  /*return (
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
    );*/

  const [diagnosis, setDiagnosis] = useState("");
  const [clickDeleteM, setClickDeleteM] = useState(false);
  const [medIsDeleted, setMedIsDeleted] = useState(false);

  const deleteMedication = async (event) => {
    event.preventDefault();

    const params = new URLSearchParams({
      Diagnosis: diagnosis,
    }).toString();
    const res = await fetch(url + `/deletemedication?${params}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      setMedIsDeleted(true);
      setTimeout(() => {
        navigate("/operations");
      }, 3000);
      console.log("Succes del");
    } else {
      alert("Errrrr");
    }
  };

  const formdeleteMedication = (
    <div className="form">
      <form onSubmit={deleteMedication}>
        <div className="input-container">
          <label>Diagnosis</label>
          <input
            type="text"
            onChange={(e) => setDiagnosis(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <input type="submit" value={"Submit"} />
        </div>
      </form>
    </div>
  );

  // const [user, setUser] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [clickDeleteUser, setClickDeleteUser] = useState(false);
  const [userIsDeleted, setUserIsDeleted] = useState(false);

  const deleteUser = async (event) => {
    event.preventDefault();

    const params = new URLSearchParams({
      FirstName: fname,
      LastName: lname,
    }).toString();
    const res = await fetch(url + `/deleteuser?${params}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      setUserIsDeleted(true);
      setTimeout(() => {
        navigate("/operations");
      }, 3000);
      console.log("Succes del");
    } else {
      alert("Errrrr");
    }
  };

  const formdeleteUser = (
    <div className="form">
      <form onSubmit={deleteUser}>
        <div className="input-container">
          <label>First Name</label>
          <input
            type="text"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Last Name</label>
          <input
            type="text"
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <input type="submit" value={"Submit"} />
        </div>
      </form>
    </div>
  );

  //schimba toate datele dintr-o zi

  const [newdate, setNewDate] = useState(null);
  const [date, setDate] = useState(null);
  const [updatedVisit, setUpdatedVisit] = useState(false);
  const [clickVisit, setClickVisit] = useState(false);

  const updateVisitDate = async (event) => {
    event.preventDefault();

    const params = new URLSearchParams({
      NewVisitDate: newdate,
      visitDate: date,
    }).toString();
    console.log(params);
    const res = await fetch(url + `/editvisit?${params}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      setUpdatedVisit(true);
      setTimeout(() => {
        navigate("/operations");
      }, 3000);
      console.log("Succes update");
    } else {
      alert("Errrrr");
    }
  };

  const formEditVisit = (
    <div className="form">
      <form onSubmit={updateVisitDate}>
        <div className="input-container">
          <label>New date</label>
          <input
            type="date"
            onChange={(e) => setNewDate(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Old Date</label>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <input type="submit" value={"Submit"} />
        </div>
      </form>
    </div>
  );

  const [animalName, setAnimalName] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [id, setId] = useState("");
  const [updatedAnimal, setUpdatedAnimal] = useState(false);
  const [clickAnimal, setClickAnimal] = useState(false);

  const updateAnimal = async (event) => {
    event.preventDefault();

    const params = new URLSearchParams({
      Name: animalName,
      Weight: newWeight,
      AnimalID: id,
    }).toString();
    console.log(params);
    const res = await fetch(url + `/editanimals?${params}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      setUpdatedAnimal(true);
      setTimeout(() => {
        navigate("/operations");
      }, 3000);
      console.log("Succes update");
    } else {
      alert("Errrrr");
    }
  };

  const formEditAnimal = (
    <div className="form">
      <form onSubmit={updateAnimal}>
        <div className="input-container">
          <label>Weight</label>
          <input
            type="text"
            onChange={(e) => setNewWeight(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Animal Name</label>
          <input
            type="text"
            onChange={(e) => setAnimalName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Animal ID</label>
          <input type="text" onChange={(e) => setId(e.target.value)} required />
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
      <button
        className="button"
        onClick={() => setInsertAnimal(!clickinsertAnimal)}
      >
        {!clickinsertAnimal ? "Insert animal" : "Hide"}
      </button>
      <div>
        {clickinsertAnimal && (
          <div className="app">
            <div className="login-form">
              <div className="title">Insert Animal</div>
              {isSubmitted ? (
                <div>Animal inserted successfully</div>
              ) : (
                renderForm
              )}
            </div>
          </div>
        )}
      </div>
      <button className="button" onClick={() => setClickDeleteM(!clickDeleteM)}>
        {!clickDeleteM ? "Delete Medication" : "Hide"}
      </button>
      <div>
        {clickDeleteM && (
          <div className="app">
            <div className="login-form">
              <div className="title">Delete Nedication</div>
              {medIsDeleted ? (
                <div>Medication deleted successfully</div>
              ) : (
                formdeleteMedication
              )}
            </div>
          </div>
        )}
      </div>
      <button
        className="button"
        onClick={() => setClickDeleteUser(!clickDeleteUser)}
      >
        {!clickDeleteUser ? "Delete User" : "Hide"}
      </button>
      <div>
        {clickDeleteUser && (
          <div className="app">
            <div className="login-form">
              <div className="title">Delete User</div>
              {userIsDeleted ? (
                <div>User inserted successfully</div>
              ) : (
                formdeleteUser
              )}
            </div>
          </div>
        )}
      </div>
      <button className="button" onClick={() => setClickVisit(!clickVisit)}>
        {!clickVisit ? "Update visit" : "Hide"}
      </button>
      <div>
        {clickVisit && (
          <div className="app">
            <div className="login-form">
              <div className="title">Update Visit</div>
              {updatedVisit ? (
                <div>Visit Date updated successfully</div>
              ) : (
                formEditVisit
              )}
            </div>
          </div>
        )}
      </div>
      <button className="button" onClick={() => setClickAnimal(!clickAnimal)}>
        {!clickAnimal ? "Update animal" : "Hide"}
      </button>
      <div>
        {clickAnimal && (
          <div className="app">
            <div className="login-form">
              <div className="title">Update Visit</div>
              {updatedAnimal ? (
                <div>Animal updated successfully</div>
              ) : (
                formEditAnimal
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Operations;
