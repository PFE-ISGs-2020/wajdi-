const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formationSchema = new Schema({
    CodeFormation: {type: String,required: true,unique: false,trim: true},
    LibelleFormation: { type: String,required: true,unique: false,trim: true},
    DateDebutFormation: { type: Date, required: true },
    DateFinFormation: { type: Date, required: true },
    DescriptionFormation: { type: String,required: true,unique: false,trim: true},
    CapaciteFormation: { type: Number, required: true },
    NomTheme :{ type: String, required: true },
    NomFormateur:{type: String, required: true},
    NomCentre:{type: String, required: true},
    Prix: {type: Number, required: true},
    imageFormation:{ type: String }
},
 {
  timestamps: true,
});

const Formation = mongoose.model('Formation', formationSchema);

module.exports = Formation;