const Validator = require("validator");
const isEmpty = require("lodash.isempty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  //convert any empty fields to string for Validator
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!Validator.isLength(data.password, { min: 7, max: 25 })) {
    errors.password = "Password mush be at least 7 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
