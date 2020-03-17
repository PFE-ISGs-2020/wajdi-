const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');//mongoose will help us to connect to our database

require('dotenv').config();
 
const app = express();
const port = process.env.PORT || 5000;

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

//require the files
const ClientRouter = require('./routes/Client');
const CentreRouter = require('./routes/Centre');
const FormationRouter = require('./routes/Formation');
const FormateurRouter = require('./routes/Formateur');
const ThemeRouter = require('./routes/Theme');
//use the files
app.use('/Centre', CentreRouter);
app.use('/Client', ClientRouter); 
app.use('/Formation', FormationRouter);
app.use('/Formateur', FormateurRouter);
app.use('/Theme', ThemeRouter);

//starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});