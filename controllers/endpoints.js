const mockData = require("./mockData.json");
const AUTH_VALUE = "birds";

function notAuth(req, res, next) {
  let auth = req.headers.authorization;

  if (auth != AUTH_VALUE) {
    res.status(401).send("Try the endpoint /start");
  } else {

    next();
  }

}

function getAuth(req, res) {
  let auth = {
    Authorization: AUTH_VALUE,
    message: "try the endpoint /birds",
  };
  res.status(200).json(auth);
}

function getAllEndpoints(req, res) {
  let message = {
    message: `You are now authorized, try some of the endpoints below`,
    endpoint: [`/birds`, `/birds/commonName`,`/birds/commonName/:commonName`, `/birds/sciNames`, `/birds/sciNames/:commonName`, `/birds/bodies`, `/birds/bodies/:commonName`, `/birds/locations`, `/birds/locations/:commonName`],
  };
  res.status(200).json(message);
}

function getListOfAllBirds(req, res) {
  let birdList = [];
  mockData.forEach((val) => birdList.push(val["Common Name"]));
  res.status(200).json(birdList);
}

function getSpecificBird(req, res) {
  let { commonName } = req.params;
  let response = mockData.filter(
    (val) => val["Common Name"].toLowerCase() == commonName.toLowerCase()
  );
  if (!response.length) {
    res.status(404).send("That common name is not valid");
  } else {
    res.status(200).json(response[0]);
  }
}

function getAllScientificName(req, res) {
  let birdList = [];
  mockData.forEach((val) => {
    let item = {
      "Common Name": val["Common Name"],
      Order: val["Order"],
      Family: val["Family"],
      Genus: val["Genus"],
      "Scientific name": val["Scientific name"],
    };
    birdList.push(item);
  });
  res.status(200).json(birdList);
}

function getSpecificScientificName(req, res) {
  let { commonName } = req.params;
  let response = [];
  mockData.forEach((val) => {
    if (val["Common Name"].toLowerCase() == commonName.toLowerCase()) {
      let item = {
        "Common Name": val["Common Name"],
        Order: val["Order"],
        Family: val["Family"],
        Genus: val["Genus"],
        "Scientific name": val["Scientific name"],
      };
      response.push(item);
    }
  });
  if (!response.length) {
    res.status(404).send("That common name is not valid");
  } else {
    res.status(200).json(response[0]);
  }
}

function getBody(req, res) {
  let response = [];
  mockData.forEach((val) => {
    response.push({
      "Common Name": val["Common Name"],
      Height: val["Height"],
      Color: val["Color"],
      Weight: val["Weight"],
    });
  });
  res.status(200).json(response);
}

function getSpecificBody(req, res) {
  let { commonName } = req.params;
  let response = [];
  mockData.forEach((val) => {
    if (val["Common Name"].toLowerCase() == commonName.toLowerCase()) {
      let item = {
        "Common Name": val["Common Name"],
        Height: val["Height"],
        Color: val["Color"],
        Weight: val["Weight"],
      };
      response.push(item);
    }
  });
  if (!response.length) {
    res.status(404).send("That common name is not valid");
  } else {
    res.status(200).json(response[0]);
  }
}

function getLocation(req, res) {
  let response = [];
  mockData.forEach((val) => {
    response.push({
      "Common Name": val["Common Name"],
      Geography: val["Geography"],
      Ecosystem: val["Ecosystem"],
      Diet: val["Diet"],
      migrates: val["migrates"],
    });
  });

  res.status(200).json(response);
}

function getSpecificLocation(req, res) {
  let { commonName } = req.params;
  let response = [];
  mockData.forEach((val) => {
    if (val["Common Name"].toLowerCase() == commonName.toLowerCase()) {
      let item = {
        "Common Name": val["Common Name"],
        Geography: val["Geography"],
        Ecosystem: val["Ecosystem"],
        Diet: val["Diet"],
        migrates: val["migrates"],
      };
      response.push(item);
    }
  });
  if (!response.length) {
    res.status(404).send("That common name is not valid");
  } else {
    res.status(200).json(response[0]);
  }
}

module.exports = {
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
  getSpecificLocation,
};
