const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateUpdateInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.NomCentre = !isEmpty(data.NomCentre) ? data.NomCentre : "";
  data.EmailCentre = !isEmpty(data.EmailCentre) ? data.EmailCentre : "";
  data.AdresseCentre = !isEmpty(data.AdresseCentre) ? data.AdresseCentre : "";
  data.TelCentre = !isEmpty(data.TelCentre) ? data.TelCentre : "";
  data.RegionCentre = !isEmpty(data.RegionCentre) ? data.RegionCentre : "";
  data.DescriptionCentre = !isEmpty(data.DescriptionCentre) ? data.DescriptionCentre : "";
  
// Name checks
  if (Validator.isEmpty(data.NomCentre)) {
    errors.NomCentre = "Nom Centre est obligatoir";
  }
// Email checks
  if (Validator.isEmpty(data.EmailCentre)) {
    errors.EmailCentre = "Email Centre field is required";
  } else if (!Validator.isEmail(data.EmailCentre)) {
    errors.EmailCentre = "Email Centre is invalid";
  }
  // Adresse checks
  if (Validator.isEmpty(data.AdresseCentre)) {
    errors.AdresseCentre = "AdresseCentre est obligatoire";
  }
  // Tel checks
  if (Validator.isEmpty(data.TelCentre)) {
    errors.TelCentre = "Tel Centre est obligatoir";
  }   

  // Region checks
  if (Validator.isEmpty(data.RegionCentre)) {
    errors.RegionCentre = "Region Centre est obligatoire";
  }
  // Description checks
  if (Validator.isEmpty(data.DescriptionCentre)) {
    errors.DescriptionCentre = "Description Centre est obligatoir";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};