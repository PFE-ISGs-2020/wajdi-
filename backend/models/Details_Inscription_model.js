const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Details_Inscription_Schema = new Schema({
  
  Id_Client:{type: Schema.Types.ObjectId, required: true,  ref: "Client"},
  EtatInscription: {type: Boolean, required: true},
  Id_Formation:{  type: Schema.Types.ObjectId, required: true, ref: "Formation"}
  
}, {
  timestamps: true,
});

const Details_Inscription = mongoose.model('Details_Inscription',Details_Inscription_Schema);

module.exports = Details_Inscription;