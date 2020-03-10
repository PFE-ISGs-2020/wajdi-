const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formationSchema = new Schema({
    CodeFormation: {type: String,required: true,unique: true,trim: true,minlength: 3},
    LibelleFormation: { type: String,required: true,unique: false,trim: true,minlength: 3},
    DateDebutFormation: { type: Date, required: true },
    DateFinFormation: { type: Date, required: true },
    DescriptionFormation: { type: String,required: true,unique: false,trim: true,minlength:4},
    CapaciteFormation: { type: Number, required: true },
    ThemeFormation :{ type: String, required: false },
    NomFormateur:{type: String, required: false}
},
 {
  timestamps: true,
});

const Formation = mongoose.model('Formation', formationSchema);

module.exports = Formation;