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

module.exports = {
  getAnimals: getAnimals,
  getAnimal: getAnimal,
  addAnimal: addAnimal,
  login: login,
  register: register,
};
