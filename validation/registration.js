const validator = require("validator");
const isEmpty = require("lodash.isempty");

module.exports = function validatorRegisterInput(data) {
  let errors = {};

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
