const router = require('express').Router();
let Client = require('../models/Client_model');

router.route('/').get((req, res) => {
    Client.find()
    .then(clients => res.json(clients))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const NomClient = req.body.NomClient;
  const PrenomClient = req.body.PrenomClient;
  const DatenaissClient = req.body.DatenaissClient;
  const ProfessionClient = req.body.ProfessionClient;
  const NiveauClient = req.body.NiveauClient;
  const EmailClient = req.body.EmailClient;
  const TelClient = req.body.TelClient;
  const PasswordClient = req.body.PasswordClient;
  const AdresseClient = req.body.AdresseClient;

  const newClient = new Client({
      NomClient, 
      PrenomClient,
      DatenaissClient, 
      ProfessionClient,
      NiveauClient,
      EmailClient,      
      PasswordClient,
      TelClient,
      AdresseClient,
    });

  newClient.save()
    .then(() => res.json('Client added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Client.findById(req.params.id)
    .then(Client => res.json(Client))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Client.findByIdAndDelete(req.params.id)
    .then(() => res.json('Client deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Client.findById(req.params.id)
    .then(client => {
        client.username = req.body.username;
        client.password = req.body.password;
        client.NomClient = req.body.NomClient;
        client.PrenomClient = req.body.PrenomClient;
        client.DatenaissClient = req.body.DatenaissClient;
        client.ProfessionClient = req.body.ProfessionClient;
        client.NiveauClient = req.body.NiveauClient;
        client.EmailClient = req.body.EmailClient;        
        client.PasswordClient = req.body.PasswordClient;
        client.TelClient = req.body.TelClient;
        client.AdresseClient = req.body.AdresseClient;
      

        client.save()
        .then(() => res.json('client updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;