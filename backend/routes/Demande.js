const router = require('express').Router();
let Demande = require('../models/Demande_model');

router.route('/').get((req, res) => {
    Demande.find()
    .then(demande => res.json(demande))
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
  

  const newDemande = new Demande({
    NomCentre,
    password,
    Adresse,
    Tel,
    Email,
    Region,
    Description    
  });

  newDemande.save()
  .then(() => res.json('Demande ajouter!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Demande.findById(req.params.id)
    .then(Demande => res.json(Demande))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Demande.findByIdAndDelete(req.params.id)
    .then(() => res.json('Demande deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Demande.findById(req.params.id)
    .then(demande => {
        
        NomCentre = req.body.NomCentre;
        password = req.body.password;
        Adresse = req.body.Adresse;
        Tel = req.body.Tel;
        Email= req.body.Email;
        Region= req.body.Region;
        Description= req.body.Description;

        demande.save()
        .then(() => res.json('Demande Modifer!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;