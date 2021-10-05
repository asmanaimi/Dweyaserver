const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');
const ordonnance = require('./ordonnance');
const express =require('express');
const router =express.Router();
const technicienschema =mongoose.Schema({
name: {type:String,required:true},
cin: {type:String,required:true},
email:{type:String,required:true,unique:true},
adress:{type:String,required:true},
tel:{type:String,required:true},
password:{type:String,required:true},
codetel:{type:String},
owner:{type:String,required:true},
nbrordotraite: {
    type: String,
    },
token:{type:String},


status: {
  type: String,
  default:'Disponible',
},



});

/*
technicienschema.pre('save',  function(next) {
    var technicien = this;

    // only hash the password if it has been modified (or is new)
    if (!technicien.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(technicien.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            technicien.password = hash;
            technicien.verify = hash
            next();
        });
    });
});
technicienschema.methods.isPasswordMatch =function(plainPassword,hashed,callback){
    bcrypt.compare(plainPassword,hashed,(err,isMatch)=>{
if(err){
    next(err);
}
callback(null,isMatch);


    });
};
*/

 
  technicienschema.methods.generateCount= function(){
    try{
      
     let nbrordotraite = ordonnance.countDocuments({'technicien': 'email'}) ;
     this.nbrordotraite = nbrordotraite,
     this.save();
     return nbrordotraite
  
    }catch(err){
      console.log(err);
    }
  
  }
const technicien =mongoose.model('technicien',technicienschema);

module.exports = technicien;
/*

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");
const ordonnance = require("./ordonnance");

const Schema = mongoose.Schema;

const Technicien = Schema({
    name: {type:String,required:true},
    cin: {type:String,required:true},
    email:{type:String,required:true,unique:true},
    adress:{type:String,required:true},
    tel:{type:String,required:true},
    password:{type:String,required:true},
    codetel:{type:String},
    owner:{type:String,required:true},
    nbrordotraite: {
        type: String,
      //  required:true,
        },
        ordonnance:{type: String},
    token:{type:String}
});
/*
Technicien.methods.generateAuthToken = function(){    try{
    nbrordotraite = ordonnance.countDocuments();
   this.nbrordotraite = nbrordotraite,
   this.save();
   return nbrordotraite

  }catch(err){
    console.log(err);
  }

}

module.exports = mongoose.model("Technicien", Technicien);
*/