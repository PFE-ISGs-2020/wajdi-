const router = require('express').Router();
let Theme = require('../models/Theme_model');

router.route('/').get((req, res) => {
    Theme.find().sort({NomTheme : 1})
    .then(theme => res.json(theme))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const NomTheme = req.body.NomTheme;

  const newTheme = new Theme({
    NomTheme
  });

  newTheme.save()
  .then(() => res.json('Thème ajouté!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Theme.findById(req.params.id)
    .then(Theme => res.json(Theme))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Theme.findByIdAndDelete(req.params.id)
    .then(() => res.json('Thème supprimé.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Theme.findById(req.params.id)
    .then(theme => {
        
        theme.NomTheme = req.body.NomTheme;

        theme.save()
        .then(() => res.json('Thème Modifié!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;