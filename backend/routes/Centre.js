const router = require('express').Router();
let Centre = require('../models/Centre_model');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateSignUpCentreInput = require("../validation/SignUpCentre");
const validateLoginCentreInput = require("../validation/LoginCentre");

router.route('/').get((req, res) => {
    Centre.find()
    .then(centres => res.json(centres))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/Acces').get((req, res) => {
    Centre.find({ Acces: 0 })
    .then(centres => res.json(centres))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/List').get((req, res) => {
    Centre.find({ Acces: 1 })
    .then(centres => res.json(centres))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Sign Up centre 
router.route('/add').post((req, res)=> {
 // Form validation
  const { errors, isValid } = validateSignUpCentreInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  Centre.findOne({ EmailCentre: req.body.EmailCentre }).then(centre => {
      if (centre) {
        return res.status(400).json({ EmailCentre: "Email Centre already exists" });
      } else {
         
        const newCentre = new Centre({
         NomCentre : req.body.NomCentre, 
         AdresseCentre : req.body.AdresseCentre,
         TelCentre : req.body.TelCentre,
         EmailCentre : req.body.EmailCentre,
         passwordCentre : req.body.passwordCentre,
         RegionCentre : req.body.RegionCentre,
         DescriptionCentre : req.body.DescriptionCentre,
         Acces : req.body.Acces
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newCentre.passwordCentre, salt, (err, hash) => {
            if (err) throw err;
            newCentre.passwordCentre = hash;
            newCentre.save()
              
              .then(centre => res.json(centre))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });


router.route('/:id').get((req, res) => {
    Centre.findById(req.params.id)
    .then(centre => res.json(centre))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Centre.findByIdAndDelete(req.params.id)
    .then(() => res.json('Centre deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Centre.findById(req.params.id)
    .then(centre => {        
      centre.NomCentre = req.body.NomCentre;  
      centre.AdresseCentre = req.body.AdresseCentre;
      centre.TelCentre = req.body.TelCentre;
      centre.EmailCentre= req.body.EmailCentre;
      centre.passwordCentre = req.body.passwordCentre;
      centre.RegionCentre= req.body.RegionCentre;
      centre.DescriptionCentre= req.body.DescriptionCentre;
        centre.Acces = Number(req.body.Acces);
        
        centre.save()
        .then(() => res.json('Centre updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
        
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updatePassword/:id').post((req, res) => {
  Centre.findById(req.params.id)
  .then(centre => {        
    centre.NomCentre = req.body.NomCentre;  
    centre.AdresseCentre = req.body.AdresseCentre;
    centre.TelCentre = req.body.TelCentre;
    centre.EmailCentre= req.body.EmailCentre;
    centre.passwordCentre= req.body.passwordCentre
    centre.RegionCentre= req.body.RegionCentre;
    centre.DescriptionCentre= req.body.DescriptionCentre;
      centre.Acces = Number(req.body.Acces);

     // Hash password before saving in database
     bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(centre.passwordCentre, salt, (err, hash) => {
        if (err) throw err;
        centre.passwordCentre = hash;
        centre.save()
          
          .then(centre => res.json('Password Centre updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      });
    }); 
  })
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/loginCentre').post((req, res)=> {

    // Form validation
  const { errors, isValid } = validateLoginCentreInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const EmailCentre = req.body.EmailCentre;
    const passwordCentre = req.body.passwordCentre;
// Find Centre by email
    Centre.findOne({ EmailCentre }).then(centre => {
    // Check if Centre exists
    if (!centre) {
      return res.status(404).json({ emailnotfound: "Email introuvable" });
    }
    if (!centre.Acces ){
      return res.status(404).json({ passwordCentre: "Demande en cours de consultation" });
    }
  // Check password
      bcrypt.compare(passwordCentre, centre.passwordCentre).then(isMatch => {
        if (isMatch) {
          // centre matched
          // Create JWT Payload
          const payload = {
            id: centre._id,
            NomCentre: centre.NomCentre
          };
  // Sign token
          jwt.sign(
            payload,
            "secret",
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });

  });

module.exports = router;