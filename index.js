require("dotenv").config()
const express = require('express');
const massive = require('massive');
const { PORT } = process.env

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


app.get('/api/test', (req, res) => {
    console.log('this is a test endpoint')
    res.send('Good job you hit the endpoint but this was a test')
})

app.listen(PORT, () => console.log('server is running on port number:', PORT));