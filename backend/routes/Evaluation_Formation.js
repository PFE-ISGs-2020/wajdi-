const router = require('express').Router();
let Evaluation_Formation = require('../models/Evaluation_Formation_model');

router.route('/').get((req, res) => {
    Evaluation_Formation.find()
    .then( Evaluation => res.json( Evaluation ))
    .catch(err => res.status(400).json('Error: ' + err));
});


  router.route('/add').post((req, res) => {    
    Evaluation_Formation.findOne({ Id_Client: req.body.Id_Client, Id_Formation: req.body.Id_Formation})
    .then(avis => {
        if (avis) {
            avis.StartFormation = req.body.StartFormation;

            avis.save()
            .then(() => res.json('Evaluation updated!'))
            .catch(err => res.status(400).json('Error: ' + err));           
            
        } else {
            const Id_Client = req.body.Id_Client;
            const Id_Formation = req.body.Id_Formation;
            const StartFormation = req.body.StartFormation ;  
          
                const newEvaluation = new  Evaluation_Formation({
                    Id_Client,
                    Id_Formation,
                    StartFormation
                });
  
                newEvaluation.save()
                .then(() => res.json('Avis ajouter!'))
                .catch(err => res.status(400).json('Error: ' + err));
                }
    })
    .catch(err => res.status(400).json('Error: ' + err));
    })

    router.route('/client/:id').get((req, res) => {
        Evaluation_Formation.find({Id_Client: req.params.id })
        .then( Evaluation => res.json( Evaluation))
        .catch(err => res.status(400).json('Error: ' + err));
    });


  router.route('/:id').get((req, res) => {
    Evaluation_Formation.find(req.params.id)
    .then( Evaluation => res.json( Evaluation))
    .catch(err => res.status(400).json('Error: ' + err));
    });
 
 
module.exports = router;



