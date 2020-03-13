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

router.route('/add').post((req, res) => {
  const NomCentre = req.body.NomCentre;
  const password = req.body.password;
  const Adresse = req.body.Adresse;
  const Tel = req.body.Tel;
  const Email= req.body.Email;
  const Region= req.body.Region;
  const Description= req.body.Description;
  const Acces = req.body.Acces;
  

  const newCentre = new Centre({
    NomCentre,
    password,
    Adresse,
    Tel,
    Email,
    Region,
    Description,
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
        
        centre.NomCentre = req.body.NomCentre;
        centre.password = req.body.password;
        centre.Adresse = req.body.Adresse;
        centre.Tel = req.body.Tel;
        centre.Email= req.body.Email;
        centre.Region= req.body.Region;
        centre.Description= req.body.Description;
        centre.Acces = Number(req.body.Acces);
        
        centre.save()
        .then(() => res.json('Centre updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
        
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;