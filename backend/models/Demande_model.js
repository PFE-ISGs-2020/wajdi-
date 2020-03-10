const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const demandeSchema = new Schema({
  NomCentre: { type: String, required: true, minlength: 3 },
  password: { type: String, required: true, minlength:8 },
  Adresse: { type: String, required: true },
  Tel: { type: String, required: true },
  Email: { type: String, required: true },
  Region: { type: String, required: true },
  Description: { type: String, required: true },
},
 {
  timestamps: true,
});

const Demande = mongoose.model('Demande', demandeSchema);

module.exports = Demande;