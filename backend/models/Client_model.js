const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  NomClient: {type: String,required: true,unique: false,trim: true,minlength: 3},
  PrenomClient: {type: String,required: true,unique: false,trim: true,minlength: 3},
  DatenaissClient: {type: Date,required: true,unique: false,trim: true},
  ProfessionClient: {type: String,required: true,unique: false,trim: true,minlength: 3},
  NiveauClient: {type: String,required: true,unique: false,trim: true,minlength: 3},
  emailClient:  {type:String,required: true,unique: false,trim: true,minlength: 3},
  TelClient:  {type: String,required: true,unique: false,trim: true,minlength: 8},
  passwordClient:  {type: String,required: true,unique: false,trim: true,minlength: 5},
  AdresseClient: {type: String,required: true,unique: false,trim: true},
  imageClient:{ type: String }

}, {timestamps: true
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;