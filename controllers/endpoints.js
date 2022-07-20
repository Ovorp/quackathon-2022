const mockData = require("./mockData.json");
const AUTH_VALUE = "birds";

function notAuth(req, res, next) {
  let auth = req.headers.authorization;

  if (auth != AUTH_VALUE) {
    res.status(401).send("Check your status code.  You are not Authorized try the endpoint /start");
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
    endpoint: [`/birds`, `/birds/commonName`,`/birds/commonName/:commonName`, `/birds/sciNames`, `/birds/sciNames/:commonName`, `/birds/bodies`, `/birds/bodies/:commonName`, `/birds/locations`, `/birds/locations/:commonName`, '/notebooks', '/answers'],
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

function finalAnswerCheck(req, res) {
  if (!req.body.answer) {
    res.status(418).send(`Please send a POST request to /leaderboard with a body.  The body should have a 'key' called answer and the 'value' should be your answer!`)
  } else if (req.body.answer === 'Aythya innotata') { 
    res.status(202).send(`Good Job now you can use postman.  To add your name to the leaderboard please send a POST request to /leaderboards, and in the body send 'name', 'data', 'animal'(Your favorite animal)`)
  } else {
    res.status(420).send(`I don't think that is the right answer, please try again!`)
  }
}

async function checkLeaderboard(req, res) {
  const db = req.app.get('db')

  const response = await db.check_leaderboard();

  res.status(200).json(response)

}

async function addLeaderboard(req, res) {
  const {username, animal} = req.body;
  const db = req.app.get('db');

  const leaderboard = await db.add_leaderboard([username, animal])

  res.status(200).json(leaderboard)
}

async function addNotebook(req, res) {
  const {username} = req.body;
  const db = req.app.get('db');

  const notebook = await db.add_notebook([
    username
  ])

  res.status(200).json(notebook)
  
}

async function getNotebook(req, res) {
  const {notebook_id} = req.params;
  const db = req.app.get('db')
  const notebook = await db.get_notebook([
    notebook_id
  ])

  res.status(200).json(notebook)
}

async function updateNotebook(req, res) {
  const {common_name, bird_height, food, color, bird_weight, ecosystem, migration, family, sci_name, notebook_id} = req.body;
  const db = req.app.get('db');
  let notebook = await db.get_notebook([notebook_id])

  notebook = notebook[0]
  let newNotebook = {
    'common_name' : common_name || notebook['common_name'] || null,
    'bird_height' : bird_height || notebook['bird_height'] || null,
    'food' : food || notebook['food'] || null,
    'color' : color || notebook['color'] || null,
    'bird_weight' : bird_weight || notebook['bird_weight'] || null,
    'ecosystem' : ecosystem || notebook['ecosytem'] || null,
    'migration' : migration || notebook['migration'] || false,
    'family' : family || notebook['family'] || null,
    'sci_name' : sci_name || notebook['sci_name'] || null

  }
  //  let newNotebook = {
  //   'common_name' :notebook[0]['common_name'] || commonName,
  //   'bird_height' :notebook[0]['bird_height'] || bird_height,
  //   'food' : notebook[0]['food'] || food,
  //   'color' :notebook[0]['color'] || color,
  //   'bird_weight' :notebook[0]['bird_weight'] || bird_weight,
  //   'ecosystem' : notebook[0]['ecosytem'] || ecosystem,
  //   'migration' : notebook[0]['migration'] || migration,
  //   'family' : notebook[0]['family'] ||family,
  //   'sci_name' : notebook[0]['sci_name'] || sci_name 
  // }
  let updatedNotebook = await db.update_notebook([notebook_id,
    newNotebook.common_name, newNotebook.bird_height, newNotebook.food, newNotebook.color, newNotebook.bird_weight, newNotebook.ecosystem, newNotebook.migration, newNotebook.family, newNotebook.sci_name
  ])

  res.status(200).json(updatedNotebook)

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
  finalAnswerCheck,
  addNotebook,
  getNotebook,
  updateNotebook,
  checkLeaderboard,
  addLeaderboard
};
