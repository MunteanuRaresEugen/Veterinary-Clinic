var config = require("./dbconfig");
const sql = require("mssql");
const jwt = require("jsonwebtoken");

async function getAnimals() {
  try {
    let pool = await sql.connect(config);
    let anims = await pool.request().query("SELECT * from Animals");
    return anims.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getAnimal(animalid) {
  try {
    let pool = await sql.connect(config);
    let anim = await pool
      .request()
      .input("input_parameter", sql.Int, animalid)
      .query("SELECT * from Animals where AnimalID = @input_parameter");
    return anim.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addAnimal(animal) {
  try {
    let pool = await sql.connect(config);
    let insertAnimal = await pool.query(
      `INSERT INTO Animals (Name,DateofBirth,Weight,OwnerID,SpeciesID,Vaccinated) OUTPUT Inserted.AnimalID VALUES ('${animal.Name}','${animal.DateofBirth}',${animal.Weight},${animal.OwnerID},${animal.SpeciesID},${animal.Vaccinated})`
    );
    return insertAnimal.recordset[0];
  } catch (err) {
    console.log(err);
  }
}

async function updateAnimal(animal) {
  try {
    let pool = await sql.connect(config);
    let updatedAnimal = await pool.query(
      `UPDATE Animals
       SET Name = '${animal.Name}', Weight = ${animal.Weight}
       WHERE AnimalID = '${animal.AnimalID}'`
    );
    console.log(updatedAnimal);
    if (updatedAnimal.rowsAffected[0] === 0)
      return {
        found: false,
      };
    else
      return {
        found: true,
      };
  } catch (err) {
    console.log(err);
    return { found: false };
  }
}

async function updateVisit(visit) {
  try {
    let pool = await sql.connect(config);
    let updatedVisit = await pool.query(
      `UPDATE Visits
       SET VisitDate = '${visit.VisitDate}'
       WHERE VisitID = '${visit.VisitID}'`
    );

    if (updatedVisit.rowsAffected[0] === 0)
      return {
        found: false,
      };
    else
      return {
        found: true,
      };
  } catch (err) {
    console.log(err);
    return { found: false };
  }
}

async function deleteUser(user) {
  try {
    let pool = await sql.connect(config);
    let deletedUser = await pool.query(
      `DELETE FROM Owners WHERE FirstName = '${user.FirstName}' AND LastName = '${user.LastName}'`
    );
    console.log(deletedUser);
    if (deletedUser.rowsAffected[0] === 0)
      return {
        deleted: false,
      };
    else
      return {
        deleted: true,
      };
  } catch (err) {
    console.log(err);
    return {
      deleted: false,
    };
  }
}

async function deleteMedication(medication) {
  try {
    let pool = await sql.connect(config);
    let deletedMedication = await pool.query(
      `DELETE FROM Medication
       WHERE Diagnosis = '${medication.Diagnosis}'`
    );

    if (deletedMedication.rowsAffected[0] === 0)
      return {
        deleted: false,
      };
    else
      return {
        deleted: true,
      };
  } catch (err) {
    console.log(err);
    return { deleted: false };
  }
}

async function login(user) {
  try {
    const email = user.email;
    const password = user.password;
    console.log(user);
    let pool = await sql.connect(config);
    let userDB = await pool.query(
      `SELECT Password from Owners WHERE Email = '${email}'`
    );
    console.log(userDB);
    let passwordDB = userDB.recordset[0].Password;
    if (password === passwordDB) {
      console.log("Login");
      const token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
      });
      return {
        logged: true,
        token,
      };
    } else {
      return {
        logged: false,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      logged: false,
    };
  }
}

async function register(user) {
  try {
    const fName = user.FirstName;
    const lName = user.LastName;
    const age = user.Age;
    const email = user.Email;
    const password = user.Password;
    const cnp = user.CNP;
    let pool = await sql.connect(config);
    let userDB = await pool.query(
      `SELECT Email from Owners WHERE Email = '${email}'`
    );
    if (userDB.recordset.length > 0) {
      console.log("This email adress is already used.Try another one");
      return {
        registered: false,
      };
    }

    let insertUser = await pool.query(
      `INSERT INTO Owners (FirstName,LastName,Age,Email,Password,CNP) OUTPUT Inserted.OwnerID VALUES ('${fName}','${lName}',${age},'${email}','${password}','${cnp}')`
    );
    return { registered: true, user: insertUser.recordset[0] };
  } catch (err) {
    console.log(err);
    return { registered: false };
  }
}

async function speciesAnimal(species) {
  try {
    let pool = await sql.connect(config);
    let animalDB = await pool.query(
      `SELECT A.Name,S.Name from Animals A
       JOIN Species S ON A.SpeciesID = S.SpeciesID
       WHERE S.Name =  '${species.Name}'`
    );
    console.log(animalDB);
    if (animalDB.recordset.length) found = true;
    else found = false;
    return { species: animalDB.recordsets, found: found };
  } catch (error) {
    console.log(error);
  }
}

async function visitAnimal(animal) {
  try {
    let pool = await sql.connect(config);
    let animalDB = await pool.query(
      `SELECT A.Name,A.Weight,V.FirstName + ' ' + V.LastName AS VetName ,Vis.VisitDate from Animals A
      JOIN Visits Vis ON A.AnimalID = Vis.AnimalID
      JOIN Vets V ON Vis.VetID = V.VetID
      WHERE A.Name = '${animal.Name}'`
    );
    //console.log(animalDB);
    if (animalDB.recordset.length) found = true;
    else found = false;
    return { animal: animalDB.recordsets, found: found };
  } catch (error) {
    console.log(error);
  }
}

async function viewAnimaldiagnosis(diagnosis) {
  try {
    let pool = await sql.connect(config);
    let animalDB = await pool.query(
      `SELECT A.Name,M.Diagnosis,M.Treatment from Animals A
      JOIN History H on A.AnimalID = H.AnimalID
      JOIN Medication M on H.MedicationID = M.MedicationID
      WHERE M.Diagnosis = '${diagnosis.Diagnosis}'
      GROUP BY A.Name,M.Diagnosis,M.Treatment`
    );
    if (animalDB.recordset.length) found = true;
    else found = false;
    return { diagnosis: animalDB.recordsets, found: found };
  } catch (err) {
    console.log(err);
  }
}

async function visitNumber() {
  try {
    let pool = await sql.connect(config);
    let animalDB = await pool.query(
      `SELECT COUNT(Visits.VisitID) AS NbVisits,Animals.Name from Visits
      JOIN Animals on Visits.AnimalID = Animals.AnimalID
      GROUP BY Animals.Name
      HAVING COUNT(Visits.VisitID) > 0`
    );
    if (animalDB.recordset.length) found = true;
    else found = false;
    return { animalDB: animalDB.recordsets, found: found };
  } catch (err) {
    console.log(err);
  }
}

async function animalVaccinated(species) {
  try {
    let pool = await sql.connect(config);
    let animalDB = await pool.query(
      `SELECT A.Name,Species.Name AS SpeciesName,O.FirstName + O.LastName AS NameOwner from Owners O
      JOIN Animals A on A.OwnerID = O.OwnerID
      JOIN Species on A.SpeciesID = Species.SpeciesID
      WHERE Species.Name = '${species.Name}' AND A.Vaccinated = 1`
    );
    if (animalDB.recordset.length) found = true;
    else found = false;
    return { species: animalDB.recordsets, found: found };
  } catch (err) {
    console.log(err);
  }
}

async function vetAppointments(vet) {
  try {
    let pool = await sql.connect(config);
    let vetDB = await pool.query(
      `SELECT V.FirstName + ' ' + V.LastName AS FullName,COUNT(*) AS Appointments FROM Vets V
      JOIN Visits Vis ON V.VetID = Vis.VetID
      WHERE V.LastName = '${vet.LastName}' AND Vis.VisitDate = '${vet.VisitDate}'
      GROUP BY V.FirstName,V.LastName
      HAVING COUNT(*) < 3`
    );
    if (vetDB.recordset.length) found = true;
    else found = false;
    return { vet: vetDB, found: found };
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAnimals: getAnimals,
  getAnimal: getAnimal,
  addAnimal: addAnimal,
  login: login,
  register: register,
  updateAnimal: updateAnimal,
  updateVisits: updateVisit,
  deleteUser: deleteUser,
  deleteMedication: deleteMedication,
  speciesAnimal: speciesAnimal,
  visitAnimal: visitAnimal,
  viewAnimaldiagnosis: viewAnimaldiagnosis,
  visitNumber: visitNumber,
  animalVaccinated: animalVaccinated,
  vetAppointments: vetAppointments,
};
