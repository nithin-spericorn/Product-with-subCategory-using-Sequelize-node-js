const express = require("express");
const cors = require("cors");
const dotenv=require("dotenv").config()
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = require('./models/index');

db.sequelize.sync({force: false})
  .then(()=> console.log('successfully synced with DB'))
  .catch((err)=> console.log("Sync error", err))


  const route = require('./router/router');
  app.use('/', route);

// set port, listen for requests

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});