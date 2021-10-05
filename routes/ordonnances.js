const express = require("express");
const router = express.Router();
const middleware =require("../middleware");
const  Ordonnance = require("../models/ordonnance");
const multer =require("multer");
const path = require("path");
const technicien = require("../models/technicien");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, req.params.id + ".jpg");
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
});

router.route("/add").post(middleware.checkToken, (req, res) => {
    const  ordonnance =  Ordonnance({
      email: req.decoded.email,
      priseencharge: req.body.priseencharge,
      medecin:req.body.medecin,
      listp:req.body.listp,
      technicien:req.body.technicien,
      status:req.body.status,

    });
    ordonnance
      .save()
      .then((result) => {
        res.json({ data: result["_id"] });
      })
      .catch((err) => {
        console.log(err), res.json({ err: err });
      });
  });

  router.route("/add/coverImage/:id")
  .patch(middleware.checkToken, upload.single("img"), (req, res) => {
    Ordonnance.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          coverImage: req.file.path,
        },
      },
      { new: true },
      (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
      }
    );
  });
 
router.route("/getownordonnances").get(middleware.checkToken, (req, res) => {
  Ordonnance.find({ email: req.decoded.email }, (err, result) => {
    if (err) return res.json(err);
    return res.json({ data: result });
  });
});

router.route("/getothorordonnances").get(middleware.checkToken, (req, res) => {
  Ordonnance.find({ email: { $ne: req.decoded.email } }, (err, result) => {
    if (err) return res.json(err);
    return res.json({ data: result });
  });
});
router.route("/getownordo").get(middleware.checkToken, (req, res) => {
  Ordonnance.find({ technicien:  req.decoded.email }, (err, result) => {
    if (err) return res.json(err);
    return res.json({ data: result });
  });
});


router.route("/:technicien").get(middleware.checkToken, (req, res) => {
  Ordonnance.find({ technicien: req.params.technicien }, (err, result) => {
    if (err) return res.json(err);
    return res.json({ data: result });
  });
});



router.route("/getordononaffecte").get( (req, res) => {
  Ordonnance.findOne({ technicien: req.params.technicien }, (err, result) => {
    if (err) return res.json({ err: err });
    if (result == null) return res.json({ data: [] });
    else return res.json({ data: result });
  });
});
router.route("/delete/:id").delete(middleware.checkToken, (req, res) => {
  Ordonnance.findOneAndDelete(
    {
      $and: [{ email: req.decoded.email }, { _id: req.params.id }],
    },
    (err, result) => {
      if (err) return res.json(err);
      else if (result) {
        console.log(result);
        return res.json("ordonnance deleted");
      }
      return res.json("ordonnance not deleted");
    }
  );
});
router.route("/deleteordotech/:id").delete((req, res) => {
  Ordonnance.findOneAndDelete(
    
      { _id: req.params.id },
    
    (err, result) => {
      if (err) return res.json(err);
      else if (result) {
        console.log(result);
        return res.json("ordonnance deleted");
      }
      return res.json("ordonnance not deleted");
    }
  );
});

router.patch("/saveetat/:id",  (req, res) => {
  //    const listp= req.body.listp;
  
      Ordonnance.findOneAndUpdate( 
        {_id:req.params.id},
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


    router.route("/checkdispo/:email").get((req, res) => {
      Ordonnance.findOne({technicien:req.params.email}, (err, result) => {
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
module.exports = router;