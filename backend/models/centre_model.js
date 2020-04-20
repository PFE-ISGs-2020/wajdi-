const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const centreSchema = new Schema({
  NomCentre: { type: String, required: true, minlength: 3,unique:true},
  AdresseCentre: { type: String, required: true },
  TelCentre: { type: String, required: true }, 
  RegionCentre: { type: String, required: true },  
  DescriptionCentre: { type: String, required: true },
  EmailCentre: { type: String, required: true },
  passwordCentre: { type: String, required: true, minlength:8 },
  Acces: { type: Number , required: true },
  image:{ type: String }
},
);

const Centre = mongoose.model('Centre', centreSchema);

module.exports = Centre;