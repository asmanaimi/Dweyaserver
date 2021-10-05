const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordonnances = Schema({
  email: String,
  medecin:String,
  id:String,
  listp:String,

  technicien: {
    type: String,
  },
  coverImage: {
    type: String,
    default: "",
  },
  priseencharge: {
    type: String,
    default: 0,
  },
  
  
  status: {
    type: String,
    default:'Non traitée',
  },
});

module.exports = mongoose.model("ordonnances", ordonnances);