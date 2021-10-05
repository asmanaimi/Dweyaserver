const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");

const Schema = mongoose.Schema;

const User = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    }
});

User.methods.generateAuthToken = function(){
  try{
   let token = jwt.sign({email:this.email}, config.key);
   this.token = token,
   this.save();
   return token

  }catch(err){
    console.log(err);
  }

}
module.exports = mongoose.model("User", User);
