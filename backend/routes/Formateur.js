const router = require('express').Router();
let Formateur = require('../models/Formateur_model');

router.route('/').get((req, res) => {
    Formateur.find()
    .then(formateur => res.json(formateur))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/listbynamecentre/:NomCentre').get((req, res) => {
    Formateur.find({NomCentre:req.params.NomCentre})
    .then(centre => res.json(centre))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const NomFormateur = req.body.NomFormateur;
  const PrenomFormateur = req.body.PrenomFormateur;
  const SpecialiteFormateur = req.body.SpecialiteFormateur;  
  const NomCentre = req.body.NomCentre;
  const TelFormateur = req.body.TelFormateur;
  const emailFormateur = req.body.emailFormateur;

  const newFormateur = new Formateur({
    NomFormateur,
    PrenomFormateur,
    SpecialiteFormateur,
    NomCentre,
    TelFormateur,
    emailFormateur
  });

  newFormateur.save()
  .then(() => res.json('Formateur ajouter!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Formateur.findById(req.params.id)
    .then(Formateur => res.json(Formateur))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Formateur.findByIdAndDelete(req.params.id)
    .then(() => res.json('Formateur deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Formateur.findById(req.params.id)
    .then(formateur => {
        
        formateur.NomFormateur = req.body.NomFormateur;
        formateur.PrenomFormateur = req.body.PrenomFormateur;
        formateur.SpecialiteFormateur = req.body.SpecialiteFormateur;
        formateur.NomCentre = req.body.NomCentre;
        formateur.TelFormateur = req.body.TelFormateur;
        formateur.emailFormateur = req.body.emailFormateur

        formateur.save()
        .then(() => res.json('Formateur Modifié!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;