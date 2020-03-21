const router = require('express').Router();
let Centre = require('../models/Centre_model');

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

router.route('/add').post((req, res) => {
  const NomCentre = req.body.NomCentre;  
  const AdresseCentre = req.body.AdresseCentre;
  const TelCentre = req.body.TelCentre;
  const EmailCentre= req.body.EmailCentre;
  const passwordCentre = req.body.passwordCentre;
  const RegionCentre= req.body.RegionCentre;
  const DescriptionCentre= req.body.DescriptionCentre;
  const Acces = req.body.Acces;
  
  const newCentre = new Centre({
    NomCentre,    
    AdresseCentre,
    TelCentre,
    EmailCentre,
    passwordCentre,
    RegionCentre,
    DescriptionCentre,
    Acces,
    
  });

  newCentre.save()
  .then(() => res.json('Centre added!'))
  .catch(err => res.status(400).json('Error: ' + err));
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
        NomCentre = req.body.NomCentre;  
        AdresseCentre = req.body.AdresseCentre;
        TelCentre = req.body.TelCentre;
        EmailCentre= req.body.EmailCentre;
        passwordCentre = req.body.passwordCentre;
        RegionCentre= req.body.RegionCentre;
        DescriptionCentre= req.body.DescriptionCentre;
        centre.Acces = Number(req.body.Acces);
        
        centre.save()
        .then(() => res.json('Centre updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
        
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;