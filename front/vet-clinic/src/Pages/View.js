import React, { useState } from "react";
import { Navbar } from "../Components/Navbar";
import { url } from "../utils";
import "../Components/Styles/View.css";

const View = () => {
  // all animals in the vet clinic
  const [isClicked, setIsClicked] = useState(false);
  const [animals, setAnimals] = useState([]);

  const handleClick = async (event) => {
    event.preventDefault();

    const res = await fetch(url + "/animals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsClicked(!isClicked);

    if (res.status === 200) {
      const results = await res.json();
      setAnimals(results);

      //console.log(animals);
    }
  };

  console.log(animals);

  const showlist = (
    <>
      Animals:
      <table className="table">
        <tr>
          <td>Name</td>
          <td>Birth</td>
          <td>Weight-kg</td>
          <td>Vaccinated</td>
        </tr>
        <tbody>
          {animals.map((animal) => (
            <tr>
              <td key={animal.AnimalID}>{animal.Name} </td>
              <td key={animal.AnimalID}>{animal.DateofBirth} </td>
              <td key={animal.AnimalID}>{animal.Weight} </td>
              <td key={animal.AnimalID}>
                {" "}
                {animal.Vaccinated ? <>Vaccinat</> : <>Nevaccinat</>}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  // animal history (input : name for A, Last name for owner)
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [animalHistory, setAnimalHistory] = useState([]);
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const clickHistory = async (event) => {
    event.preventDefault();
    setIsClicked2(true);

    console.log(name, lname);
    const params = new URLSearchParams({
      Name: name,
      LastName: lname,
    }).toString();
    const res = await fetch(url + `/history?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const result = await res.json();
      setAnimalHistory(result);
    }
  };

  const formHistory = (
    <div className="form">
      <form onSubmit={clickHistory}>
        <div className="input-container">
          <label>Animal Name </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Owner Last Name </label>
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

  const showHistoryList = (
    <table className="table">
      <tr>
        <td>Name</td>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Diagnosis</td>
        <td>Treatment</td>
      </tr>
      <tbody>
        {animalHistory.map((result) => (
          <tr>
            <td key={result.AnimalID}>{result.Name} </td>
            <td key={result.AnimalID}>{result.FirstName} </td>
            <td key={result.AnimalID}>{result.LastName} </td>
            <td key={result.AnimalID}>{result.Diagnosis} </td>
            <td key={result.AnimalID}>{result.Treatment} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // vizitele veterinarilor la o specie de animal specificata

  const [speciesName, setSpeciesName] = useState("");

  const [vet, setVet] = useState([]);
  const [isClicked3, setIsClicked3] = useState(false);
  const [isClicked4, setIsClicked4] = useState(false);

  const clickVisitSpecies = async (event) => {
    event.preventDefault();
    setIsClicked4(true);

    console.log(name, lname);
    const params = new URLSearchParams({
      Name: speciesName,
    }).toString();
    const res = await fetch(url + `/visitspeciesname?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const result = await res.json();
      setVet(result);
    }
  };

  const formVisitSpecies = (
    <div className="form">
      <form onSubmit={clickVisitSpecies}>
        <div className="input-container">
          <label>Species Name</label>
          <input
            type="text"
            onChange={(e) => setSpeciesName(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <input type="submit" value={"Submit"} />
        </div>
      </form>
    </div>
  );

  const showVetSpeciesList = (
    <table className="table">
      <tr>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Specialization</td>
        <td>Animal Name</td>
        <td>Visit Date</td>
      </tr>
      <tbody>
        {vet.map((result) => (
          <tr>
            <td key={result.VisitID}>{result.FirstName} </td>
            <td key={result.VisitID}>{result.LastName} </td>
            <td key={result.VisitID}>{result.Specialization} </td>
            <td key={result.VisitID}>{result.Name} </td>
            <td key={result.VisitID}>{result.VisitDate} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // lista cu animale vaccinate/nu

  const [vaccinated, setVaccinated] = useState("");

  const [vis, setVis] = useState([]);
  const [isClicked5, setIsClicked5] = useState(false);
  const [isClicked6, setIsClicked6] = useState(false);

  const clickVaccinated = async (event) => {
    event.preventDefault();
    setIsClicked6(true);

    //console.log(name, lname);
    const params = new URLSearchParams({
      Vaccinated: vaccinated,
    }).toString();
    const res = await fetch(url + `/visitselectvaccination?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const result = await res.json();
      setVis(result);
    }
  };

  const formVaccinated = (
    <div className="form">
      <form onSubmit={clickVaccinated}>
        <div className="input-container">
          <label>Vaccinated</label>
          <input
            type="text"
            onChange={(e) => setVaccinated(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <input type="submit" value={"Submit"} />
        </div>
      </form>
    </div>
  );

  const showVaccinationList = (
    <table className="table">
      <tr>
        <td>Visit Date</td>
        <td>Animal Name</td>
      </tr>
      <tbody>
        {vis.map((result) => (
          <tr>
            <td key={result.VisitID}>{result.VisitDate} </td>
            <td key={result.VisitID}>{result.Name} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // lista cu ownerii care au animalele nevaccinate

  const [isClicked7, setIsClicked7] = useState(false);
  const [owners, setOwners] = useState([]);

  const clickOwnersnovacc = async (event) => {
    event.preventDefault();

    setIsClicked7(!isClicked7);
    const res = await fetch(url + "/novaccination", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const results = await res.json();
      setOwners(results);

      //console.log(animals);
    }
  };

  const showOwnersanimalsnovacc = (
    <table className="table">
      <tr>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Age</td>
      </tr>
      <tbody>
        {owners.map((result) => (
          <tr>
            <td key={result.OwnerID}>{result.FirstName} </td>
            <td key={result.OwnerID}>{result.LastName} </td>
            <td key={result.OwnerID}>{result.Age} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // animalele afisate dupa o anunmita specie

  const [speciesAnimal, setSpeciesanimal] = useState("");

  const [animal1, setAnimal1] = useState([]);
  const [isClicked8, setIsClicked8] = useState(false);
  const [isClicked9, setIsClicked9] = useState(false);

  const viewAnimalsfspecies = async (event) => {
    event.preventDefault();
    setIsClicked9(true);

    const params = new URLSearchParams({
      Name: speciesAnimal,
    }).toString();
    const res = await fetch(url + `/species?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const result = await res.json();
      setAnimal1(result);
    }
  };

  const formAnimalsSpecies = (
    <div className="form">
      <form onSubmit={viewAnimalsfspecies}>
        <div className="input-container">
          <label>Species Name</label>
          <input
            type="text"
            onChange={(e) => setSpeciesanimal(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <input type="submit" value={"Submit"} />
        </div>
      </form>
    </div>
  );

  const showAnimalsSpecies = (
    <table className="table">
      <tr>
        <td>Animal Name</td>
        <td>Species Name</td>
      </tr>
      <tbody>
        {animal1.map((result) => (
          <tr>
            <td key={result.VisitID}>{result.Name} </td>
            <td key={result.VisitID}>{result.SpeciesName} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  // animal + veterinar + vizita
  const [animalVisit, setAnimalVisit] = useState("");

  const [animal2, setAnimal2] = useState([]);
  const [isClicked10, setIsClicked10] = useState(false);
  const [isClicked11, setIsClicked11] = useState(false);

  const viewAnimalVisit = async (event) => {
    event.preventDefault();
    setIsClicked11(true);

    const params = new URLSearchParams({
      Name: animalVisit,
    }).toString();
    const res = await fetch(url + `/visitanimal?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const result = await res.json();
      setAnimal2(result);
    }
  };

  const formAnimalsVisit = (
    <div className="form">
      <form onSubmit={viewAnimalVisit}>
        <div className="input-container">
          <label>Animal Name</label>
          <input
            type="text"
            onChange={(e) => setAnimalVisit(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <input type="submit" value={"Submit"} />
        </div>
      </form>
    </div>
  );

  const showAnimalVisit = (
    <table className="table">
      <tr>
        <td>Animal Name</td>
        <td>Weight</td>
        <td>Vet Name</td>
        <td>Visit Date</td>
      </tr>
      <tbody>
        {animal2.map((result) => (
          <tr>
            <td key={result.AnimalID}>{result.Name} </td>
            <td key={result.AnimalID}>{result.Weight} </td>
            <td key={result.AnimalID}>{result.VetName} </td>
            <td key={result.AnimalID}>{result.VisitDate} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // animalele cu diagnosticul x

  const [animalDiagnosis, setAnimalDiagnosis] = useState("");

  const [animalRes, setAnimalRes] = useState([]);
  const [isClicked12, setIsClicked12] = useState(false);
  const [isClicked13, setIsClicked13] = useState(false);

  const viewDiagnosis = async (event) => {
    event.preventDefault();

    setIsClicked13(true);

    const params = new URLSearchParams({
      Diagnosis: animalDiagnosis,
    }).toString();
    const res = await fetch(url + `/viewanimaldiagnosis?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const result = await res.json();
      setAnimalRes(result);
    }
  };

  const formAnimalDiagnosis = (
    <div className="form">
      <form onSubmit={viewDiagnosis}>
        <div className="input-container">
          <label>Diagnosis</label>
          <input
            type="text"
            onChange={(e) => setAnimalDiagnosis(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <input type="submit" value={"Submit"} />
        </div>
      </form>
    </div>
  );

  const showAnimalDiagnosis = (
    <table className="table">
      <tr>
        <td>Animal Name</td>
        <td>Diagnosis</td>
        <td>Treatment</td>
      </tr>
      <tbody>
        {animalRes.map((result) => (
          <tr>
            <td key={result.AnimalID}>{result.Name} </td>
            <td key={result.AnimalID}>{result.Diagnosis} </td>
            <td key={result.AnimalID}>{result.Treatment} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // numarul de vizite a fiecarui animal

  const [isClicked14, setIsClicked14] = useState(false);
  const [animalsVisits, setAnimalsVisits] = useState([]);

  const clickAnimalsVisits = async (event) => {
    event.preventDefault();

    const res = await fetch(url + "/visitnumber", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsClicked14(!isClicked14);

    if (res.status === 200) {
      const results = await res.json();
      setAnimalsVisits(results);

      //console.log(animals);
    }
  };

  const showlistnumbervisits = (
    <>
      <table className="table">
        <tr>
          <td>Name</td>
          <td>Number of Visits</td>
        </tr>
        <tbody>
          {animalsVisits.map((animal) => (
            <tr>
              <td key={animal.AnimalID}>{animal.Name} </td>
              <td key={animal.AnimalID}>{animal.Nb_of_Visits} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <div>
      <Navbar />
      <br />
      <p>Operations for view user can select:</p>
      <div className="parent">
        <br />
        <div className="child">
          {isClicked && <div>{showlist}</div>}
          <button className="button" onClick={handleClick}>
            {!isClicked ? "View animals" : "Hide"}
          </button>
        </div>
        <div className="child">
          {isClicked1 && <>{formHistory} </>}
          {isClicked2 && isClicked1 && <>{showHistoryList} </>}
          <button className="button" onClick={() => setIsClicked1(!isClicked1)}>
            {!isClicked1 ? "View animal history" : "Hide"}
          </button>
        </div>
        <div className="child">
          {isClicked3 && <>{formVisitSpecies} </>}
          {isClicked4 && isClicked3 && <>{showVetSpeciesList} </>}
          <button className="button" onClick={() => setIsClicked3(!isClicked3)}>
            {!isClicked3 ? "View Vet visits on selected species" : "Hide"}
          </button>
        </div>
        <div className="child">
          {isClicked5 && <>{formVaccinated} </>}
          {isClicked6 && isClicked5 && <>{showVaccinationList} </>}
          <button className="button" onClick={() => setIsClicked5(!isClicked5)}>
            {!isClicked5
              ? "View visits of animal vaccinated/not vaccinated"
              : "Hide"}
          </button>
        </div>
        <div className="child">
          {isClicked7 && <div>{showOwnersanimalsnovacc}</div>}
          <button className="button" onClick={clickOwnersnovacc}>
            {!isClicked7
              ? "View information for owner who have animals not vaccinated"
              : "Hide"}
          </button>
        </div>
        <div className="child">
          {isClicked8 && <>{formAnimalsSpecies} </>}
          {isClicked9 && isClicked8 && <>{showAnimalsSpecies} </>}
          <button className="button" onClick={() => setIsClicked8(!isClicked8)}>
            {!isClicked8 ? "View animal from a selected species" : "Hide"}
          </button>
        </div>
        <div className="child">
          {isClicked10 && <>{formAnimalsVisit} </>}
          {isClicked11 && isClicked10 && <>{showAnimalVisit} </>}
          <button
            className="button"
            onClick={() => setIsClicked10(!isClicked10)}
          >
            {!isClicked10 ? "View animal visits" : "Hide"}
          </button>
        </div>
        <div className="child">
          {isClicked12 && <>{formAnimalDiagnosis} </>}
          {isClicked13 && isClicked12 && <>{showAnimalDiagnosis} </>}
          <button
            className="button"
            onClick={() => setIsClicked12(!isClicked12)}
          >
            {!isClicked12 ? "View animal with specified diagnosis" : "Hide"}
          </button>
        </div>
        <div className="child">
          {isClicked14 && <div>{showlistnumbervisits}</div>}
          <button className="button" onClick={clickAnimalsVisits}>
            {!isClicked14 ? "View animals visits number" : "Hide"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
