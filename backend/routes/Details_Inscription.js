const router = require('express').Router();
let Details_Inscription = require('../models/Details_Inscription_model');

router.route('/').get((req, res) => {
    Details_Inscription.find()
    .then( Details => res.json( Details))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/Demande/:id').get((req, res) => {
    Details_Inscription.find({ EtatInscription: 0 , Id_Formation: req.params.id })
    .then( Details => res.json( Details))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/List/:id').get((req, res) => {
    Details_Inscription.find({ EtatInscription: 1, Id_Formation: req.params.id })
    .then( Details => res.json( Details))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/FormationsEnCours/:id').get((req, res) => {
    Details_Inscription.find({ EtatInscription: 1, Id_Client: req.params.id /* ,  DateFinFormation :  { $gte :new Date(Date.now())} */ })
    .populate("Id_Formation")
    .then( Details => res.json( Details))
    .catch(err => res.status(400).json('Error: ' + err));
})
    
router.route('/FormationsAtteintes/:id').get((req, res) => {
    Details_Inscription.find({ EtatInscription: 1, Id_Client: req.params.id   , DateFinFormation :  { $lte :new Date(Date.now())}  })
    .populate("Id_Formation")
    .then( Details => res.json( Details))
    .catch(err => res.status(400).json('Error: ' + err));
})

//mes achats
//-----------------
/* router.route('/achat/:id').get((req, res) => {
    Details_Inscription.find({ EtatInscription: 1, Id_Client: req.params.id })
    .then( Details => res.json( Details))
    .catch(err => res.status(400).json('Error: ' + err));
}); */
//-----------------
router.route('/InscriptionExist').get((req, res) => {
Details_Inscription.find({ Id_Client: req.body.Id_Client, Id_Formation: req.body.Id_Formation })
    .then( Details => res.json(Details))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/add').post((req, res) => {
    const PrenomClient = req.body.PrenomClient;
    const EtatInscription = 0;
    const NomClient = req.body.NomClient ;
    const Id_Formation = req.body.Id_Formation;
    const Id_Client = req.body.Id_Client;
  
    const newDetails = new Details_Inscription({
        Id_Client,
        PrenomClient,
        EtatInscription,
        NomClient,
        Id_Formation
    });
  
    newDetails.save()
    .then(() => res.json('Détails inscription ajoutée!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').get((req, res) => {
    Details_Inscription.findById(req.params.id)
    .then(Details => res.json(Details))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Details_Inscription.findByIdAndDelete(req.params.id)
    .then(() => res.json('Details Inscription deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Details_Inscription.findById(req.params.id)
    .then(Details => {
        
        Details.Id_Client = req.body.Id_Client;
        Details.NomClient = req.body.NomClient;
        Details.EtatInscription =  Number(req.body.EtatInscription);
        Details.PrenomClient = req.body.PrenomClient;
        Details.Id_Formation = req.body.Id_Formation;

        Details.save()
        .then(() => res.json('Details Inscription updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/Approve/:id').post((req, res) => {
    Details_Inscription.findById(req.params.id)
    .then(Details => {
                
        Details.Id_Client = req.body.Id_Client;
        Details.EtatInscription = 1;
        Details.DateInscription = req.body.DateInscription;
        Details.Id_Formation = req.body.Id_Formation;

        formation.save()
        .then(() => res.json('Details Inscription updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;



