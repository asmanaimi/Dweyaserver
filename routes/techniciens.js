const express =require('express');
const router =express.Router();
const technicien = require('../models/technicien');

var _ = require('lodash');
const config = require("../config");
const jwt = require("jsonwebtoken");
let middleware = require("../middleware");
const ordonnance = require('../models/ordonnance');
const { count } = require('../models/ordonnance');
//auth technicien

router.patch("/saveetattech/:email",  (req, res) => {
  //    const listp= req.body.listp;
  
      technicien.findOneAndUpdate( 
        {email:req.params.email},
        {
          $set: {
            status: req.body.status,
          },
        },
        { new: true },
        (err, ordonnance) => {
          if (err) return res.status(500).send(err);
          const response = {
            message: "status added successfully updated",
            data: ordonnance,
          };

          console.log(response);
          return res.status(200).send(response);
        }
      );
    });
router.route("/authtechnicien").post((req, res) => {
    technicien.findOne({ email: req.body.email }, (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      if (result === null) {
        return res.status(403).json("email incorrect");
      }
      if (result.password === req.body.password) {
        // here we implement the JWT token functionality
        let token = jwt.sign({ email: req.body.email }, config.key, {});
  
        res.json({
          token: token,
          msg: "success",
        });
        
      } 
      else {
        res.status(403).json("password is incorrect");
      }
      
    });
  });

  router.post('/login',(req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
  
    const query={email}
    //utilisateur existe 
    
    technicien.findOne(query,(err,techniciens)=>{
        if(err){
            return res.send({
                success: false,
                message:'Error, please try again'
            });
        }
        if(!techniciens){
            return res.send({
                success: false,
                message:'Eror, Account not found'
            });
        }
            let returntechnicien = new technicien({
                name:techniciens.name,
                email :techniciens.email,
               // nbrordotraite : nbrordotraite,
            })
          
           return res.send({
                success: true,
                message:'you can login now',
                techniciens: returntechnicien,
                nbrordotraite : nbrordotraite,
              });
            
        });
    });
  router.route("/:email").get(middleware.checkToken, (req, res) => {
    technicien.findOne({ email: req.params.email }, (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      return res.json({
        data: result,
        email: req.params.email,
    
      });
    });
  }
  
  );
  /*
  router.route("/checkemail/:email").get((req, res) => {
    technicien.findOne({ email: req.params.email }, (err, result) => {
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
  });*/


  router.route("/update/:email").patch((req, res) => {
    console.log(req.params.email);
    technicien.findOneAndUpdate(
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
    technicien.findOneAndDelete({  email: req.params.email }, (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      const msg = {
        msg: "technicien deleted",
        email: req.params.email,
      };
      return res.json(msg);
    });
  });
  router.post('/listordotech',(req, res, next) => {
   const technicien= req.body.technicien; 
  
    ordonnance.find( {technicien},(err, ordonnances)=>{
      if (err) {
        return res.send({
          success: false,
          message: 'Error while reteriving the tasks'
        });
      }
  
      return res.send({
        success: true,
       ordonnances
      });
    });
  }); 
  
 router.post('/listo',(req, res, next) => {
  const nbrordotraite= req.body.nbrordotraite; 
 
   technicien.find( {nbrordotraite},(err, techniciens)=>{
     if (err) {
       return res.send({
         success: false,
         message: 'Error while reteriving the tasks'
       });
     }
 
     return res.send({
       success: true,
      techniciens
     });
   });
 });
  router.route('/countordotech/:technicien').get(function(req,res){
   ordonnance.countDocuments({technicien:req.params.technicien}).exec((err, count) => {
  return res.json({ nbrordotraite: count })
});
 });
 
 
 router.patch("/save/:id",  (req, res) => {
  //    const listp= req.body.listp;
  //var total =ordonnance.countDocuments();
   nbrordotraite =req.body.nbrordotraite;
  ordonnance.countDocuments({technicien:req.body.technicien}).exec((err, count) => {
  if (err) {
      res.send(err);
      return;
  } 
  
   nbrordotraite =count;
console.log(count);

      technicien.findByIdAndUpdate( {_id:req.params.id},
        {
          $set: {
           nbrordotraite:nbrordotraite,
          
          },
        },
        { new: true },
        (err, technicien) => {
          if (err) return res.status(500).send(err);
          const response = {
            message: "nbr  successfully updated",
            data: technicien,
          };
          return res.status(200).send(response);
        }
      );
     // res.json({ count }) ;

    });
    });
    router.post('/registercount',(req, res)=>{
      //nbrordotraite =req.body.nbrordotraite;
     ordonnance.countDocuments({technicien:req.body.technicien}).exec((err, count) => {
      if (err) {
          res.send(err);
          return;
      } 
      
       nbrordotraite =count;
    console.log(count);
        let newcount = new Number({
            nbrordotraite:nbrordotraite,
           
             
        });
        newcount.save((err,number)=>{
            if(err){
              //  throw err;
              return   res.send({
                  success:false,
                  message:'Failed to save nbr ordo technicien'
              });
            }
            res.send({
             success:true,
             message:'success to save nbr ordo  technicien',
            number
            });
        })
      })
     });
     router.patch("/statustech/:email",  (req, res) => {
      //    const listp= req.body.listp;
      const dispo ="disponible";
     const  status= req.body.status = dispo;
  
          technicien.findOneAndUpdate( 
            {email:req.params.email},
            {
              $set: {
                status: status,
              },
            },
            { new: true },
            (err, techniciens) => {
              if (err) return res.status(500).send(err);
              const response = {
                message: "status  successfully updated",
                data: techniciens,
              };
    
              console.log(response);
              return res.status(200).send(response);
            }
          );
        });
        router.route("/update/:email").patch((req, res) => {
          console.log(req.params.email);
          technicien.findOneAndUpdate(
            { email: req.params.email },
            { $set: { status: req.body.status } },
            (err, result) => {
              if (err) return res.status(500).json({ msg: err });
              const msg = {
                msg: "status successfully updated",
                email: req.params.email,
              };
              return res.json(msg);
            }
          );
        });
module.exports=router;
