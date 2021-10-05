const express =require('express');
const Technicien = require('../models/technicien');
const router =express.Router();
const  Ordonnance = require("../models/ordonnance");
const User = require('../models/users');
var _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require("../config");
let middleware = require("../middleware");
const Pharmacien = require('../models/pharmacien');
/*router.route("/add").post(middleware.checkToken, (req, res) => {
  const  techniciens= Technicien({
   email: req.decoded.email,
   emailadress:req.body.emailadress,
   name:req.body.name,
  adress:req.body.adress,
  cin:req.body.tel,
  tel:req.body.tel,
  password:req.body.password
  });
  techniciens
    .save()
    .then((result) => {
      res.json({ data: result["_id"] });
    })
    .catch((err) => {
      console.log(err), res.json({ err: err });
    });
});*/
router.post('/registerpharma', (req, res, next) => {
  let newPharmacien = new Pharmacien({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cin: req.body.cin,
    tel: req.body.tel,
    adress: req.body.adress,
    listp: req.body.listp,
  });
  newPharmacien.save((err, pharmacien) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Failed to save the pharmacien'
      });
    }
    res.send({
      success: true,
      message: 'pharmacien Saved',
  pharmacien,
    });
   
  });
});

 router.post('/registertech',(req, res)=>{
  nbrordotraite =req.body.nbrordotraite;
 
    let newtechnicien = new Technicien({
        name:req.body.name,
        email:req.body.email,
       adress:req.body.adress,
       cin:req.body.cin,
       tel:req.body.tel,
       owner:req.body.owner,
       nbrordotraite:nbrordotraite,
       password:req.body.password,
       status:req.body.status
 
    });
   
    newtechnicien.save((err,technicien)=>{
        if(err){
          //  throw err;
          return   res.send({
              success:false,
              message:'Failed to save technicien'
          });
        }
        res.send({
         success:true,
         message:'success to save technicien',
        technicien
        });
    })
 
 });
 
/*
router.route("/registertech").post((req, res) => {
  console.log("inside the register");
  const technicien = new Technicien({
    name:req.body.name,
    email:req.body.email,
   adress:req.body.adress,
   cin:req.body.cin,
   tel:req.body.tel,
   owner:req.body.owner,
   nbrmaxordo:req.body.nbrmaxordo,
   nbrordotraite:req.body.nbrordotraite,

  ordonnance:req.body.ordonnance,

   password:req.body.password
  });
  technicien
    .save()
    .then(() => {
      console.log("user registered");
      res.status(200).json({ msg: "User Successfully Registered" });
    })
    .catch((err) => {
      res.status(403).json({ msg: err });
    });
});
*/
/*
router.route("/listtech").get(middleware.checkToken, (req, res) => {
  Technicien.find({ email: req.decoded.email }, (err, result) => {
    if (err) return res.json(err);
    return res.json({ data: result });
  });
});
*/
 router.post('/auth' ,(req,res,next)=>{
    const email =req.body.email;
    const password=req.body.password;
    const query={email}
    Pharmacien.findOne(query,(err,pharmacien)=>{
 if(err){
     return res.send({
         success:false,
         message:'Error,please try again'
     });
 }
 if(!pharmacien){
     return res.send({
         success:false,
         message:'Error,Account not found'
     });
 }
 pharmacien.isPasswordMatch(password,pharmacien.password,(err,isMatch)=>{
 if(!isMatch){
 
 return res.send({
 success:false,
 message:'Error ,invalid password'
 });
 
 }
 const ONE_WEEK = 604800;
 const token = jwt.sign({ email },  config.key, { expiresIn: ONE_WEEK });

 
let returnpharmacien ={
    name:pharmacien.name, 
    email:pharmacien.email, 
    listp:pharmacien.listp,
    id:pharmacien._id,
    token
  
 }
 return res.send({
     success:true,
     message:'You can login now',
     pharmacien:returnpharmacien,
     token
     });
 });
    });
 });
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTkwOTI5ODQsImV4cCI6MTYxOTY5Nzc4NH0.1f1KugE7uwXMyFVuV49Z0nHUb4IV9XGNg-r9gWKTG7Q
 router.put('/updatepharma/:id',   function (req, res, next) {
    // fetch user
    pharmacien.findById(req.params.id, function(err, post) {
        if (err) return next(err);
 
        _.assign(post, req.body); // update user
        post.save(function(err) {
            if (err) return next(err);
            return res.json(200, post);
        })
    });
 });
 router.post('/list',(req, res, next) => {
 
  const owner = req.body.owner;
  Technicien.find({ owner }, (err, techniciens)=>{
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
 /*
  router.route("/getown").get(middleware.checkToken, (req, res) => {
    Technicien.find({ email: req.decoded.email }, (err, result) => {
      if (err) return res.json(err);
      return res.json({ data: result });
    });
  });*/
  router.delete('/deletetech/:id',  (req, res, next)=>{
   
    const technicienId= req.params.id;
    Technicien.remove({ _id: technicienId }, (err) => {
        if(err) {
          return res.send({
            success: false,
            message: 'Failed to delete technicien'
          });
        }
  
        return res.send({
          success: true,
          message: 'technicien deleted'
        });
    });
  });
 
 /* router.route('/update/:id').put((req, res, next) => {
    console.log(req.body)
  
    Technicien.findOneAndUpdate({_id:req.params.id}, {
      $set: {name: req.body.name,cin:req.body.cin,email:req.body.email,adress:req.body.adress,tel:req.body.tel},}).exec().then(result=>{
        res.status(200).json({ message: "Update successful!" });
      })
  })*/
  router.route('/gettech').post((req, res) => {
    Technicien.find({_id:req.body._id}).exec().then(result=>{
        res.status(200).json({ result:result[0],message: "get technicin data!" });
  
      })
  })
  
 router.put('/updatetech/:id', function (req, res, next) {
    // fetch user
    Technicien.findById(req.params.id, function(err, post) {
        if (err) return next(err);
 
        _.assign(post, req.body); // update user
        post.save(function(err) {
            if (err) return next(err);
            return res.json(200, post);
        })
    });
 });
 /*router.route('/updatetech/:id').put((req, res, next) => {
  console.log(req.body)

  Technicien.findOneAndUpdate({_id:req.params.id}, {
    $set: { name:req.body.name,
      email:req.body.email,
     adress:req.body.adress,
     cin:req.body.cin,
     tel:req.body.tel,
    password:req.body.password
  },}).exec().then(result=>{
      res.status(200).json({ message: "Update successful!" });

    })
})*/
 router.get('/listp',(req, res, next) => {
  User.find( (err, user)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the tasks'
      });
    }

    return res.send({
      success: true,
    user
    });
  });
});
router.get('/list-pha',(req,res, next)=>{ 
  Pharmacien.find(null,{ "listp": true },(error,data)=>{
      if(error) {
          return next(error)
      } else {
          res.json(data)
      }
      
  })
});

router.post('/listordo',(req, res, next) => {
  const listp= req.body.listp;
  
  Ordonnance.find( {listp},(err, ordonnances)=>{
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


router.route('/getordo').post((req, res) => {
 
  Ordonnance.find({ _id:req.body._id}).exec().then(result=>{
      res.status(200).json({ result:result[0],message: "get ordo data!" });

    })
})
 totalnbrtech = router.route('/counttech').post(function(req,res){
  const owner = req.body.owner;
  Technicien.countDocuments( {owner}, function(err, result){

      if(err){
          res.send(err)
      }
      else{
          res.json(result)
      }
      let 

 })


})


/*
router.post('/listordotr',middleware.checkToken,(req, res, next) => {
  const nbrmaxordo=req.body.nbrmaxordo;
  const listp= req.body.listp;

 

  Ordonnance.find( {listp},(err, ordonnances)=>{
    for ( nbrtech=0  ;nbrtech<=Technicien.length;nbrtech++) {
      for ( nbrordo=0  ;nbrordo<=nbrmaxordo;nbrordo++) {
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
  }
}
  });
    
});*/


router.patch("/add/tech/:id",  (req, res) => {
  Ordonnance.findByIdAndUpdate( {_id:req.params.id},
      {
        $set: {
          technicien: req.body.technicien,
        },
      },
      { new: true },
      (err, ordonnance) => {
        if (err) return res.status(500).send(err);
        const response = {
          message: "technicien added successfully updated",
          data: ordonnance,
        };
        return res.status(200).send(response);
      }
    );
 
  });

  router.patch("/add/techcount/:email",  (req, res) => {
    const non ="nondisponible";

    status= req.body.status=non;
    Technicien.findOneAndUpdate( {email:req.params.email},
        {
          $set: {
            status: status,
          },
        },
        { new: true },
        (err, techniciens) => {
          if (err) return res.status(500).send(err);
          const response = {
            message: "technicien added successfully updated",
            data: techniciens,
          };
          return res.status(200).send(response);
        }
      );
   
    });
  router.route("/update/:email").patch((req, res) => {
    console.log(req.params.email);
    Pharmacien.update(
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
  
  /*router.get("/check/:id",  (req, res) => {
    //    const listp= req.body.listp;
    const status = req.body.status = true ;
        Ordonnance.findByIdAndUpdate( {_id:req.params.id},
          {
            $set: {
              status: true,
            },
          },
          { new: true },
          (err, result) => {
            if (err) return res.status(500).send(err);
            if (result == null) {
              return res.json({ Status: false});
            } else {
              return res.json({ Status: true });
            }
            //return res.status(200).send(response);
          }
        );
      });

      
 */
     
module.exports=router;
