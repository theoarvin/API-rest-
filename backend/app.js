// importation de express
const express = require('express');
const bodyParser =  require('body-parser');
// importation du fichier database pour mongoose
const mongoose = require('./db/db');

const userRoutes = require('./routes/user');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use('/api/auth', userRoutes)
  
  
module.exports = app;