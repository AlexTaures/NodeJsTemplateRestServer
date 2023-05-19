const emailValidator = require('email-validator');
const colors = require('colors');

const emailValidation = (email) => {
  var validator = emailValidator.validate(email);
  if(!validator){
    console.log("Invalid sent email".red);
  };
  return validator;
}



module.exports = {
  emailValidation
}