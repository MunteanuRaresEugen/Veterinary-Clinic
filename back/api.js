var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();
require("dotenv").config();

var Db = require("./dboperations");
var Animals = require("./animals");
const dboperations = require("./dboperations");
const { response } = require("express");
const { register } = require("./dboperations");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((request, response, next) => {
  console.log("middleware");
  next();
});

// tabele pentru afisare

router.route("/animals").get(async (req, res) => {
  const result = await dboperations.getAnimals();
  res.status(200).json(result[0]);
});

router.route("/getusers").get(async (req, res) => {
  const result = await dboperations.getUsers();
  res.status(200).json(result[0]);
});

router.route("/animals").post((request, response) => {
  console.log(request.body);
  let animal = { ...request.body };
  dboperations
    .addAnimal(animal)
    .then((result) => {
      //console.log(result);
      response.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/editanimals").post(async (req, res) => {
  console.log(req.body);
  const result = await dboperations.updateAnimal(req.body);
  console.log(result);
  res.sendStatus(result.found ? 200 : 400);
});

router.route("/editvisit").put(async (req, res) => {
  const result = await dboperations.updateVisit(req.body);
  console.log(result.found);
  res.sendStatus(result.found ? 200 : 400);
});

router.route("/deleteuser").delete(async (req, res) => {
  const result = await dboperations.deleteUser(req.query);
  console.log(result.deleted, result.deletedUser);
  res.sendStatus(result.deleted ? 200 : 400);
});

router.route("/deletemedication").delete(async (req, res) => {
  const result = await dboperations.deleteMedication(req.query);
  console.log(result.deleted, result.deleteMedication);
  res.sendStatus(result.deleted ? 200 : 400);
});

router.route("/login").post(async (req, res) => {
  console.log(req.body);
  const result = await dboperations.login(req.body);
  console.log(result);
  res.status(result.logged ? 200 : 400).send({ token: result.token });
});

router.route("/register").post(async (req, res) => {
  console.log(req.body);
  //let user = { ...req.body };
  /*const result = dboperations
    .register(req.body)
    .then((result) => {
      console.log(result);
      res.status(201).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });*/
  const result = await dboperations.register(req.body);
  res.sendStatus(result.registered ? 201 : 400);
});

// join simple
router.route("/species").get(async (req, res) => {
  const result = await dboperations.speciesAnimal(req.query);
  //console.log(result.species[0]);
  //res.json(result.species[0]).status(result.found ? 200 : 400);
  console.log(res.query, found);
  if (result.found) res.json(result.species).status(200);
  else res.sendStatus(400);
});

router.route("/visitanimal").get(async (req, res) => {
  const result = await dboperations.visitAnimal(req.query);
  console.log(res.query, found);
  //res.json(result.species[0]).status(result.found ? 200 : 400);
  if (result.found) res.json(result.animal).status(200);
  else res.sendStatus(400);
});

router.route("/viewanimaldiagnosis").get(async (req, res) => {
  const result = await dboperations.viewAnimaldiagnosis(req.query);
  //console.log(result.diagnosis);
  //res.json(result.species[0]).status(result.found ? 200 : 400);
  console.log(res.query, found);
  if (result.found) res.json(result.diagnosis).status(200);
  else res.sendStatus(400);
});

router.route("/visitnumber").get(async (req, res) => {
  const result = await dboperations.visitNumber();
  console.log(result.animalDB);
  //res.json(result.species[0]).status(result.found ? 200 : 400);
  if (result.found) res.json(result.animalDB).status(200);
  else res.sendStatus(400);
});

router.route("/animalweight").get(async (req, res) => {
  const result = await dboperations.animalWeight(req.query);
  console.log(res.query, found);
  if (result.found) res.json(result.species).status(200);
  else res.sendStatus(400);
});

router.route("/vetappointments").get(async (req, res) => {
  const result = await dboperations.vetAppointments(req.query);
  console.log(res.query, found);
  if (result.found) res.json(result.vet).status(200);
  else res.sendStatus(400);
  console.log(result.vet);
});

//owneri care au animale nevaccinate
router.route("/novaccination").get(async (req, res) => {
  const result = await dboperations.notvaccinatedanimals();
  if (result.found) res.json(result.ownerDB).status(200);
  else res.sendStatus(400);
});

//toate vizitele cu animale nevaccinate.nevaccinat()
router.route("/visitselectvaccination").get(async (req, res) => {
  const result = await dboperations.visitnovacc(req.query);
  //console.log(result.body, found);
  console.log(req.query);
  console.log(result.visitDB, found);
  if (result.found) res.json(result.visitDB).status(200);
  else res.sendStatus(400);
});

//

router.route("/visitspeciesname").get(async (req, res) => {
  const result = await dboperations.visitspecies(req.query);
  //console.log(result.body, found);
  console.log(req.query);
  console.log(result.vetDB, found);
  if (result.found) res.json(result.vetDB).status(200);
  else res.sendStatus(400);
});

router.route("/history").get(async (req, res) => {
  const result = await dboperations.historyanimal(req.query);
  console.log(req.query);
  console.log(result.historyDB, found);
  if (result.found) res.json(result.historyDB).status(200);
  else res.sendStatus(400);
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log("Order API is running at " + port);
