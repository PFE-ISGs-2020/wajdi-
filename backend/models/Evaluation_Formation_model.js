const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Evaluation_Formation_Schema = new Schema({
  
    Id_Client:{type: Schema.Types.ObjectId, required: true,  ref: "Client"},
    Id_Formation:{  type: Schema.Types.ObjectId, required: true, ref: "Formation"},
    StartFormation: {type: Number, required: true, trim: true,default:0}
  
}, {
  timestamps: true,
});

const Evaluation_Formation = mongoose.model('Evaluation_Formation',Evaluation_Formation_Schema);

module.exports = Evaluation_Formation ;