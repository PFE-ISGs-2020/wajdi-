const router = require('express').Router();
let Formation = require('../models/Formation_model');

router.route('/').get((req, res) => {
    Formation.find()
    .then(formation => res.json(formation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const CodeFormation = req.body.CodeFormation;
  const LibelleFormation = req.body.LibelleFormation;
  const DateDebutFormation = req.body.DateDebutFormation;
  const DateFinFormation = req.body.DateFinFormation;
  const DescriptionFormation= req.body.DescriptionFormation;
  const CapaciteFormation= req.body.CapaciteFormation;
  const NomTheme= req.body.NomTheme;
  const NomFormateur= req.body.NomFormateur;
  const NomCentre =req.body.NomCentre;

  const newFormation = new Formation({
    CodeFormation,
    LibelleFormation,
    DateDebutFormation,
    DateFinFormation,
    DescriptionFormation,
    CapaciteFormation ,
    NomTheme ,
    NomFormateur ,
    NomCentre
  });

  newFormation.save()
  .then(() => res.json('Formation ajouter!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Formation.findById(req.params.id)
    .then(Formation => res.json(Formation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Formation.findByIdAndDelete(req.params.id)
    .then(() => res.json('Formation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Formation.findById(req.params.id)
    .then(formation => {
        
        CodeFormation = req.body.CodeFormation;
        LibelleFormation = req.body.LibelleFormation;
        DateDebutFormation = req.body.DateDebutFormation;
        DateFinFormation = req.body.DateFinFormation;
        DescriptionFormation= req.body.DescriptionFormation;
        CapaciteFormation= req.body.CapaciteFormation;
        NomTheme= req.body.NomTheme;
        NomFormateur= req.body.NomFormateur;
        NomCentre=req.body.NomCentre;

        formation.save()
        .then(() => res.json('Formation Modifer!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;