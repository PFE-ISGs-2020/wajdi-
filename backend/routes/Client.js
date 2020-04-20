const router = require('express').Router();
let Client = require('../models/Client_model');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateSignUpClientInput = require("../validation/SignUpClient");
const validateLoginClientInput = require("../validation/LoginClient");

router.route('/').get((req, res) => {
    Client.find()
    .then(clients => res.json(clients))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Sign Up Client
router.route('/add').post((req, res)=> {
    // Form validation
  const { errors, isValid } = validateSignUpClientInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Client.findOne({ emailClient: req.body.emailClient }).then(client => {
      if (client) {
        return res.status(400).json({ emailClient: "Email Client already exists" });
      } else {
         
         newClient = new Client({
            NomClient : req.body.NomClient,
             PrenomClient : req.body.PrenomClient,
             DatenaissClient : req.body.DatenaissClient,
             ProfessionClient : req.body.ProfessionClient,
             NiveauClient : req.body.NiveauClient,
             emailClient : req.body.emailClient,
             TelClient : req.body.TelClient,
             passwordClient : req.body.passwordClient,
             AdresseClient : req.body.AdresseClient
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newClient.passwordClient, salt, (err, hash) => {
            if (err) throw err;
            newClient.passwordClient = hash;
            newClient.save()
              
              .then(client => res.json(client))
              .catch(err => console.log(err));
          });
        });
      }
    });
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

router.route('/loginClient').post((req, res)=> {

    // Form validation
  const { errors, isValid } = validateLoginClientInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const emailClient = req.body.emailClient;
    const passwordClient = req.body.passwordClient;
// Find client by email
    Client.findOne({ emailClient }).then(client => {
    // Check if client exists
    if (!client) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
  // Check password
      bcrypt.compare(passwordClient, client.passwordClient).then(isMatch => {
        if (isMatch) {
          // client matched
          // Create JWT Payload
          const payload = {
            id: client._id,
            NomClient: client.NomClient
          };
  // Sign token
  
          jwt.sign(
            payload,
            "secret",
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

module.exports = router;