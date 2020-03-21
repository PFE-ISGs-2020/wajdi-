const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  NomClient: {type: String,required: true,unique: false,trim: true,minlength: 3},
  PrenomClient: {type: String,required: true,unique: false,trim: true,minlength: 3},
  DatenaissClient: {type: Date,required: true,unique: false,trim: true},
  ProfessionClient: {type: String,required: true,unique: false,trim: true,minlength: 3},
  NiveauClient: {type: String,required: true,unique: false,trim: true,minlength: 3},
  EmailClient:  {type:String,required: true,unique: false,trim: true,minlength: 3},
  TelClient:  {type: String,required: true,unique: false,trim: true,minlength: 8},
  PasswordClient:  {type: String,required: true,unique: false,trim: true,minlength: 5},
  AdresseClient: {type: String,required: true,unique: false,trim: true}

}, {timestamps: true
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;