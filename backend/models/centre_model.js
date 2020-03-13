const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const centreSchema = new Schema({
  NomCentre: { type: String, required: true, minlength: 3 },
  password: { type: String, required: true, minlength:8 },
  Adresse: { type: String, required: true },
  Tel: { type: String, required: true },
  Email: { type: String, required: true },
  Region: { type: String, required: true },
  Description: { type: String, required: true },
  Acces: { type: Number , required: true },
},
 );

const Centre = mongoose.model('Centre', centreSchema);

module.exports = Centre;