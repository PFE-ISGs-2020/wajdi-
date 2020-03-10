const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const themeSchema = new Schema({
    NomTheme: {type: String,required: true,unique: true,trim: true},
},
 {
  timestamps: true,
});

const Theme = mongoose.model('Theme',themeSchema);

module.exports = Theme;