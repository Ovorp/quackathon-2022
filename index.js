require("dotenv").config()
const express = require('express');
const massive = require('massive');
const { PORT } = process.env
const {getAuth, notAuth, getAuthPost} = require('./controllers/endpoints.js')

const app = express();

app.use(express.json())

// massive({
//     connectionString: CONNECTION_STRING,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   }).then((dbInstance) => {
//     app.set('db', dbInstance);
//     console.log('The database is running');
//   });

const API_TEST = `/api/test`


app.get(API_TEST, getAuth)

app.use(notAuth)

app.get(`${API_TEST}/after`, getAuthPost)
app.listen(PORT || 3000, () => console.log('server is running on port number:', PORT||3000));