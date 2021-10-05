const express = require("express");
const User = require("../models/users");
const config = require("../config");
const jwt = require("jsonwebtoken");
let middleware = require("../middleware");
const router = express.Router();
var _ = require('lodash');

router.route("/:email").get(middleware.checkToken, (req, res) => {
  User.findOne({ email: req.params.email }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    return res.json({
      data: result,
      email: req.params.email,
    });
  });
}

);

router.route("/checkemail/:email").get((req, res) => {
  User.findOne({ email: req.params.email }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    if (result !== null) {
      return res.json({
        Status: true,
      });
      
    } else
      return res.json({
        Status: false,
      });
  });
});
/*
router.post('/login',(req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;

  const query={email}
  //utilisateur existe 
  User.findOne(query,(err,user)=>{
      if(err){
          return res.send({
              success: false,
              message:'Error, please try again'
          });
      }
      if(!user){
          return res.send({
              success: false,
              message:'Eror, Account not found'
          });
      }
          let returnUser ={
              username:user.username,
              email :user.email,
              token:user.generateAuthToken(),
            
          }
          return res.send({
              success: true,
              message:'you can login now',
              user: returnUser,
              
          });
      });
  });

*/

router.post('/login',(req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;

  const query={email}
  //utilisateur existe 
  User.findOne(query,(err,user)=>{
      if(err){
          return res.send({
              success: false,
              message:'Error, please try again'
          });
      }
      if(!user){
          return res.send({
              success: false,
              message:'Eror, Account not found'
          });
      }
          let returnUser ={
              username:user.username,
              email :user.email,
            
          }
          return res.send({
              success: true,
              message:'you can login now',
              user: returnUser,
              token : user.generateAuthToken(),
          });
      });
  });
router.route("/register").post((req, res) => {
  console.log("inside the register");
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  //token:req.body.token,
  });
  user
    .save()
    .then(() => {
      console.log("user registered");
      res.status(200).json({ msg: "User Successfully Registered" });
    })
    .catch((err) => {
      res.status(403).json({ msg: err });
    });
});

router.route("/update/:email").patch((req, res) => {
  console.log(req.params.email);
  User.findOneAndUpdate(
    { email: req.params.email },
    { $set: { password: req.body.password } },
    (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      const msg = {
        msg: "password successfully updated",
        email: req.params.email,
      };
      return res.json(msg);
    }
  );
});

router.route("/delete/:email").delete(middleware.checkToken, (req, res) => {
  User.findOneAndDelete({  email: req.params.email }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    const msg = {
      msg: "User deleted",
      email: req.params.email,
    };
    return res.json(msg);
  });
});

/*
router.get('/listpha',(req,res, next)=>{ 
  Pharmacien.find({adresspharma:req.params.adresspharma},(error,data)=>{
      if(error) {
          return next(error)
      } else {
          res.json(data)
      }
      
  })
});
*/

module.exports = router;