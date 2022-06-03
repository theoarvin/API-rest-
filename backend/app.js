// importation de express
const express = require('express');
const mongoose = require('./db/db');
const dotenv = require("dotenv");
dotenv.config();
const path = require('path');
const helmet = require('helmet');
// importation des routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauces');

const app = express();

app.use(helmet());

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

app.use('/images', express.static(path.join(__dirname, 'images')));

// route utilisateurs
app.use('/api/auth', userRoutes);
// route sauce
app.use('/api/sauces',sauceRoutes) ;


module.exports = app;