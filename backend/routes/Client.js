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
  const emailClient = req.body.emailClient;
  const TelClient = req.body.TelClient;
  const LoginClient = req.body.LoginClient;
  const passwordClient = req.body.passwordClient;
  const AdresseClient = req.body.AdresseClient;

  const newClient = new Client({
      NomClient, 
      PrenomClient,
      DatenaissClient, 
      ProfessionClient,
      NiveauClient,
      emailClient,
      TelClient,
      LoginClient,
      passwordClient,
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
        client.emailClient = req.body.emailClient;
        client.TelClient = req.body.TelClient;
        client.LoginClient = req.body.LoginClient;
        client.passwordClient = req.body.passwordClient;
        client.AdresseClient = req.body.AdresseClient;
      

        client.save()
        .then(() => res.json('client updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;