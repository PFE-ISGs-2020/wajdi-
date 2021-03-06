const router = require('express').Router();
let Details_Inscription = require('../models/Details_Inscription_model');

router.route('/').get((req, res) => {
    Details_Inscription.find()
    .then( Details => res.json( Details))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/Demande/:id').get((req, res) => {
    Details_Inscription.find({ EtatInscription: 0 , Id_Formation: req.params.id })
    .populate("Id_Client")
    .then( Details => res.json( Details))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/List/:id').get((req, res) => {
    Details_Inscription.find({ EtatInscription: 1, Id_Formation: req.params.id })
    .populate("Id_Client")
    .then( Details => res.json( Details))
    .catch(err => res.status(400).json('Error: ' + err));
});

//mes achats
//-----------------
router.route('/cours/:id').get((req, res) => {
    Details_Inscription.find({ EtatInscription: 1, Id_Client: req.params.id })
    .populate("Id_Formation")
    .then( Details => res.json( Details))
    .catch(err => res.status(400).json('Error: ' + err));
}); 
//----------------

// For the client
router.route('/MesDemandes/:id').get((req, res) => {
    Details_Inscription.find({ EtatInscription: 0, Id_Client: req.params.id  })
    .populate("Id_Formation")
    .then( Details => res.json( Details))
    .catch(err => res.status(400).json('Error: ' + err));
})



router.route('/add').post((req, res) => {
    
    Details_Inscription.findOne({ Id_Client: req.body.Id_Client, Id_Formation: req.body.Id_Formation ,DateFinFormation: req.body.Id_Formation.DateFinFormation})
    .then(Details => {
        if (Details) {
            if(Details.EtatInscription){
             res.json("Vous êtes déjà inscrit à cette formation!")   
            } else{
                res.json("Vous avez déjà envoyé une demande d'inscription à cette formation!")
            }
            
        } else {
                const EtatInscription = 0;
                const Id_Formation = req.body.Id_Formation;
                const Id_Client = req.body.Id_Client;
            
                const newDetails = new Details_Inscription({
                    Id_Client,
                    EtatInscription,
                    Id_Formation
    });
  
    newDetails.save()
    .then(() => res.json("Votre demande d'inscription est envoyée avec succès"))
    .catch(err => res.status(400).json('Error: ' + err));
  }})
  .catch(err => res.status(400).json('Error: ' + err));})

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


router.route('/Approve/:id').post((req, res) => {
    Details_Inscription.findById(req.params.id)
    .then(Details => {
                
        Details.EtatInscription = 1;
        Details.save()
        .then(() => res.json('Details Inscription updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;



