const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Details_Inscription_Schema = new Schema({
  
  Id_Client:{type: Schema.Types.ObjectId, required: true,  ref: "Client"},
  NomClient: {type: String, required: true, trim: true, unique:false},
  PrenomClient: {type: String, required: true, trim: true},
  EtatInscription: {type: Boolean, required: true},
  Id_Formation:{  type: Schema.Types.ObjectId, required: true, ref: "Formation"}
  
}, {
  timestamps: true,
});

const Details_Inscription = mongoose.model('Details_Inscription',Details_Inscription_Schema);

module.exports = Details_Inscription;