const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const responsableSchema = new Schema({
  username: { type: String, required: true, minlength: 3 },
  password: { type: String, required: true, minlength:8 },
}, {
  timestamps: true,
});

const Responsable = mongoose.model('Responsable', responsableSchema);

module.exports = Responsable;