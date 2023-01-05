import React, { useState } from "react";
import { Navbar } from "../Components/Navbar";
import { url } from "../utils";

const View = () => {
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

    if (isClicked)
      if (res.status === 200) {
        const results = await res.json();
        setAnimals(results);

        //console.log(animals);
      }
  };

  console.log(animals);

  const showlist = (
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
  );

  return (
    <div>
      <Navbar />
      <br />
      <div>
        Operations for view user can select:
        <br />
        <button onClick={handleClick}>View animals</button>
        {isClicked ? <div>{showlist}</div> : ""}
      </div>
    </div>
  );
};

export default View;
