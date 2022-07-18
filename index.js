require("dotenv").config();
const express = require("express");
const massive = require("massive");
const { PORT } = process.env;

const {
  getAuth,
  notAuth,
  getAllEndpoints,
  getListOfAllBirds,
  getSpecificBird,
  getAllScientificName,
  getSpecificScientificName,
  getBody,
  getSpecificBody,
  getLocation,
  getSpecificLocation
} = require("./controllers/endpoints.js");

const app = express();

app.use(express.json());

// massive({
//     connectionString: CONNECTION_STRING,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   }).then((dbInstance) => {
//     app.set('db', dbInstance);
//     console.log('The database is running');
//   });

app.get(`/start`, getAuth);

app.use(notAuth);

app.get(`/birds`, getAllEndpoints);
app.get(`/birds/commonName`, getListOfAllBirds);
app.get(`/birds/commonName/:commonName`, getSpecificBird);
app.get(`/birds/sciNames`, getAllScientificName);
app.get(`/birds/sciNames/:commonName`, getSpecificScientificName)
app.get(`/birds/bodies`, getBody)
app.get(`/birds/bodies/:commonName`, getSpecificBody)
app.get(`/birds/locations`, getLocation)
app.get(`/birds/locations/:commonName`, getSpecificLocation)




app.listen(PORT || 3000, () =>
  console.log("server is running on port number:", PORT || 3000)
);
