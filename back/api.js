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

router.route("/animals").get((request, response) => {
  dboperations.getAnimals().then((result) => {
    //console.log(result);
    response.json(result[0]);
  });
});

router.route("/animals/:id").get((request, response) => {
  dboperations.getAnimal(request.params.id).then((result) => {
    //console.log(result);
    response.json(result[0]);
  });
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

var port = process.env.PORT || 8090;
app.listen(port);
console.log("Order API is running at " + port);
