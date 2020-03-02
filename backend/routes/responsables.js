const router = require('express').Router();
let Responsable = require('../models/responsable_model');

router.route('/').get((req, res) => {
    Responsable.find()
    .then(responsables => res.json(responsables))
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
  

  const newResponsable = new Responsable({
    NomCentre,
    password,
    Adresse,
    Tel,
    Email,
    Region,
    Description,
    
  });

  newResponsable.save()
  .then(() => res.json('Responsable added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Responsable.findById(req.params.id)
    .then(responsable => res.json(responsable))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Responsable.findByIdAndDelete(req.params.id)
    .then(() => res.json('Responsable deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Responsable.findById(req.params.id)
    .then(responsable => {
        
        NomCentre = req.body.NomCentre;
        password = req.body.password;
        Adresse = req.body.Adresse;
        Tel = req.body.Tel;
        Email= req.body.Email;
        Region= req.body.Region;
        Description= req.body.Description;

        responsable.save()
        .then(() => res.json('Responsable updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;