const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formateurSchema = new Schema({
  NomFormateur: {type: String,required: true,trim: true,unique:false},
  PrenomFormateur: {type: String,required: true,trim: true,unique:false},
  SpecialiteFormateur: {type: String,required: true,trim: true},
  emailFormateur:  {type:String,required: true,trim: true,minlength: 3},
  TelFormateur:  {type: String,required: true,unique: false,trim: true},
  NomCentre:{type: String, required: true}
}, {
  timestamps: true,
});

const Formateur = mongoose.model('Formateur',formateurSchema);

module.exports = Formateur;