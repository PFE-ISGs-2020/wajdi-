const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.NomClient = !isEmpty(data.NomClient) ? data.NomClient : "";
  data.PrenomClient = !isEmpty(data.PrenomClient) ? data.PrenomClient : "";
  data.ProfessionClient = !isEmpty(data.ProfessionClient) ? data.ProfessionClient : "";
  data.emailClient = !isEmpty(data.emailClient) ? data.emailClient : "";
  data.TelClient = !isEmpty(data.TelClient) ? data.TelClient : "";
  data.passwordClient = !isEmpty(data.passwordClient) ? data.passwordClient : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.AdresseClient = !isEmpty(data.AdresseClient) ? data.AdresseClient : "";
 
// Nom / prénom checks
  if (Validator.isEmpty(data.NomClient)) {
    errors.NomClient = "Nom Client est obligatoir";
  }
  if (Validator.isEmpty(data.PrenomClient)) {
    errors.PrenomClient = "Prenom Client est obligatoir";
  }
// Email checks
  if (Validator.isEmpty(data.emailClient)) {
    errors.emailClient = "Email Client field is required";
  } else if (!Validator.isEmail(data.emailClient)) {
    errors.emailClient = "Email Client is invalid";
  }
  // Adresse checks
  if (Validator.isEmpty(data.AdresseClient)) {
    errors.AdresseClient = "Adresse Client est obligatoire";
  }

   // Profession Client checks
   if (Validator.isEmpty(data.ProfessionClient)) {
    errors.ProfessionClient = "Profession Client est obligatoire";
  }
  // Tel checks
  if (Validator.isEmpty(data.TelClient)) {
    errors.TelClient = "Tel Client est obligatoir";
  }
 
  
// Password checks
  if (Validator.isEmpty(data.passwordClient)) {
    errors.passwordClient = "password Client field is required";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
if (!Validator.isLength(data.passwordClient, { min: 8 })) {
    errors.passwordClient = "Password must be at least 8 characters";
  }
  //checks length nom / prénom
  if (!Validator.isLength(data.NomClient, { min: 3 })) {
    errors.NomClient = "Nom Client must be at least 3 characters";
  }
  if (!Validator.isLength(data.PrenomClient, { min: 3 })) {
    errors.PrenomClient = "Prenom Client must be at least 3 characters";
  }
  
if (!Validator.equals(data.passwordClient, data.password2)) {
    errors.password2 = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};