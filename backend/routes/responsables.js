const router = require('express').Router();
let Responsable = require('../models/responsable_model');

router.route('/').get((req, res) => {
    Responsable.find()
    .then(responsables => res.json(responsables))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  

  const newResponsable = new Responsable({
    username,
    password,
    
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
        responsable.username = req.body.username;
        responsable.password = req.body.password;
      

        responsable.save()
        .then(() => res.json('Responsable updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;