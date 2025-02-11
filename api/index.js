const express = require('express');
require('dotenv').config();
const cookieParser = require("cookie-parser");

const connection = require('./config/database.js');
const authRoute = require('./routes/auth.route.js');
const userRoute = require('./routes/patient.route.js');

const app = express();
const { PORT } = process.env;

connection
  .then(() => {
    console.log("Database Connected!");
  })
  .catch(err => console.log(err));

// MIDDLEWARE 
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.listen(PORT, () => {
  console.log(`App running at http://127.0.0.1:${PORT}`);
})
