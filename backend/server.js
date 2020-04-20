const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');//mongoose will help us to connect to our database
const passportCentre = require("passport");
const passportClient = require("passport");

require('dotenv').config();
 
const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//middle ware sending nd receving in .json
app.use(cors());
app.use(express.json()); 
//middle ware end

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
 
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Passport Centre middleware
app.use(passportCentre.initialize());
// Passport Centre config
require("./passportCentre")(passportCentre);

// Passport Client middleware
app.use(passportClient.initialize());
// Passport Client config
require("./passportClient")(passportClient);

//require the files
const ClientRouter = require('./routes/Client');
const CentreRouter = require('./routes/Centre');
const FormationRouter = require('./routes/Formation');
const FormateurRouter = require('./routes/Formateur');
const ThemeRouter = require('./routes/Theme');
const Details_Inscription_Router =  require('./routes/Details_Inscription');
//to save an image
const ImageRouter = require('./routes/image');
//use the files
app.use('/Centre', CentreRouter);
app.use('/Client', ClientRouter); 
app.use('/Formation', FormationRouter);
app.use('/Formateur', FormateurRouter);
app.use('/Theme', ThemeRouter);
app.use('/Details_Inscription', Details_Inscription_Router);
//to save an image
app.use('/uploads', express.static('uploads'));
app.use('/image', ImageRouter);
//starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});