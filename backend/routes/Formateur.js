const router = require('express').Router();
let Formateur = require('../models/Formateur_model');

router.route('/').get((req, res) => {
    Formateur.find()
    .then(formateur => res.json(formateur))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const NomFormateur = req.body.NomFormateur;
  const PrenomFormateur = req.body.PrenomFormateur;
  const SpecialiteFormateur = req.body.SpecialiteFormateur;  

  const newFormateur = new Formateur({
    NomFormateur,
    PrenomFormateur,
    SpecialiteFormateur,
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
        
        NomFormateur = req.body.NomFormateur;
        PrenomFormateur = req.body.PrenomFormateur;
        SpecialiteFormateur = req.body.SpecialiteFormateur;
        
        formateur.save()
        .then(() => res.json('Formateur Modifer!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;