const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginClientInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.emailClient = !isEmpty(data.emailClient) ? data.emailClient : "";
  data.passwordClient = !isEmpty(data.passwordClient) ? data.passwordClient : "";
// Email checks
  if (Validator.isEmpty(data.emailClient)) {
    errors.emailClient = "Email field is required";
  } else if (!Validator.isEmail(data.emailClient)) {
    errors.emailClient = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.passwordClient)) {
    errors.passwordClient = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};