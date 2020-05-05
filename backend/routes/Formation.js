  
const router = require('express').Router();
let Formation = require('../models/Formation_model');

router.route('/').get((req, res) => {
    Formation.find()
    .then(formation => res.json(formation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/listbynamecentre/:NomCentre').get((req, res) => {
    Formation.find({NomCentre:req.params.NomCentre})
    .then(centre => res.json(centre))
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
  const Prix =req.body.Prix;

  const newFormation = new Formation({
    CodeFormation,
    LibelleFormation,
    DateDebutFormation,
    DateFinFormation,
    DescriptionFormation,
    CapaciteFormation ,
    NomTheme ,
    NomFormateur ,
    NomCentre,
    Prix
  });

  newFormation.save()
  .then(() => res.json('Formation ajoutée!'))
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
                        
        formation.CodeFormation = req.body.CodeFormation;
        formation.LibelleFormation = req.body.LibelleFormation;
        formation.DateDebutFormation = req.body.DateDebutFormation;
        formation.DateFinFormation = req.body.DateFinFormation;
        formation.DescriptionFormation= req.body.DescriptionFormation;
        formation.CapaciteFormation= req.body.CapaciteFormation;
        formation.NomTheme= req.body.NomTheme;
        formation.NomFormateur= req.body.NomFormateur;
        formation.NomCentre=req.body.NomCentre;
        formation.Prix=req.body.Prix;

        formation.save()
        .then(() => res.json('Formation Modifée!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;