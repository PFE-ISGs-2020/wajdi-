const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.EmailCentre = !isEmpty(data.EmailCentre) ? data.EmailCentre : "";
  data.passwordCentre = !isEmpty(data.passwordCentre) ? data.passwordCentre : "";
// Email checks
  if (Validator.isEmpty(data.EmailCentre)) {
    errors.EmailCentre = "Ce champ est obligatoir";
  } else if (!Validator.isEmail(data.EmailCentre)) {
    errors.EmailCentre = "Email invalide";
  }
// Password checks
  if (Validator.isEmpty(data.passwordCentre)) {
    errors.passwordCentre = "Ce champ est obligatoir";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};