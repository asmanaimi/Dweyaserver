/*const express =require('express');
const router =express.Router();
const Admin = require('../models/admin');
const Pharmacie = require('../models/pharmacie');
const Pharmacien = require('../models/pharmacien');


//Login
router.post('/auth' ,(req,res,next)=>{
   const email =req.body.email;
   const password=req.body.password;
   const query={email}
   Admin.findOne(query,(err,admin)=>{
if(err){
    return res.send({
        success:false,
        message:'Error,please try again'
    });
}
if(!admin){
    return res.send({
        success:false,
        message:'Error,Account not found'
    });
}
admin.isPasswordMatch(password,admin.password,(err,isMatch)=>{
if(!isMatch){

return res.send({
success:false,
message:'Error ,invalid password'
});

}
let returnAdmin ={
   name:admin.name, 
   email:admin.email, 
   id:admin._id
}
return res.send({
    success:true,
    message:'You can login now',
    admin:returnAdmin
    });
});
   });
});

//registration
router.post('/register' ,(req,res,next)=>{
   let newAdmin = new Admin({
       name:req.body.name,
       email:req.body.email,
       password:req.body.password
       
   });
   newAdmin.save((err,admin)=>{
       if(err){
         return   res.send({
             success:false,
             message:'Failed to save the admin'
         });
       }
       res.send({
        success:true,
        message:'success to save the admin',
        admin
       });
   })
  
});


 router.route("/registerp").post((req, res) => {
  console.log("inside the register");
  const pharmacien = new Pharmacien({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    adresspharma: req.body.adresspharma,

    cin:req.body.tel,
    tel:req.body.tel,
  });
  pharmacien
    .save()
    .then(() => {
      console.log("user registered");
      res.status(200).json({ msg: "User Successfully Registered" });
    })
    .catch((err) => {
      res.status(403).json({ msg: err });
    });
});

 router.get('/list',(req, res) => {
    //  const owner = req.body.owner;
      pharmacien.find( (err, pharmaciens)=>{
        if (err) {
          return res.send({
            success: false,
            message: 'Error while reteriving the tasks'
          });
        }
    
        return res.send({
          success: true,
          pharmaciens
        });
      });
    });
    
router.route("/listpha").get( (req, res) => {
    Pharmacien.find(null, { "adresspharma": true },(err, result) => {
       if (err) return res.status(500).json({ msg: err });
       return res.json({
         data: result,       
       });


       
     });
   });
   router.get('/list-pha',(req,res, next)=>{ 
    Pharmacien.find(null,{ "adresspharma": true },(error,data)=>{
        if(error) {
            return next(error)
        } else {
            res.json(data)
        }
        
    })
  });

   router.post('/add-pharmacie',(req, res, next) => {
    const pharmacie = new Pharmacie({
      name: req.body.name,
      adress:req.body.adress,
     
    });
    pharmacie.save((err, pharmacie) => {
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, pelase try again'
        });
      }

      return res.send({
        success: true,
        pharmacie,
        message: 'Pharmacie Saved'
      });

    });
});
//update parc
router.route('/update-pharmacie/:id').put((req, res, next) => {
    console.log(req.body)
  
    Pharmacie.findOneAndUpdate({_id:req.params.id}, {
      $set: {name: req.body.name,adress: req.body.adress},}).exec().then(result=>{
        res.status(200).json({ message: "Update successful!" });
  
      })
  })
  router.route('/getpharmacie').post((req, res) => {
    Pharmacie.find({_id:req.body._id}).exec().then(result=>{
        res.status(200).json({ result:result[0],message: "get pharmacie" });
  
      })
  });
  //supprimer parc
  router.delete('/remove/:id',(req, res, next) => {
    const pharmacieId = req.params.id;
    Pharmacie.remove({ _id: pharmacieId}, (err) => {
        if(err) {
          return res.send({
            success: false,
            message: 'Failed to delete the task'
          });
        }
        return res.send({
          success: true,
          message: 'pharmacie deleted'
        });
    });
  });
  router.route("/pharmacy").get( (req, res) => {
    Pharmacien.find({ adresspharma: req.params.adresspharma }, (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      return res.json({
        data: result,
        adresspharma: req.params.adresspharma,
      });
    });
  });
module.exports=router;
*/