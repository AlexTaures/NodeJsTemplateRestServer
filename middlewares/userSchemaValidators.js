const emailValidator = require('email-validator');
const colors = require('colors');
const bcryptjs = require('bcryptjs');

const emailValidation = (email) => {
  var validator = emailValidator.validate(email);
  if(!validator){
    console.log("Invalid sent email".red);
  };
  return validator;
}

const passwordValidation = (password) => {
  if(password.length !== 6){
    console.log(`Password lenght is: ${password.length}, must have 6 characters`.red);
    return false;
  }
  return true;
}

const passwordCrypt = (password) => {
//pass hash
const salt = bcryptjs.genSaltSync(); //<<--default (10), steps for crypt
  if(password){
    password = bcryptjs.hashSync( password, salt );
  }
  return password;
}



module.exports = {
  emailValidation, 
  passwordValidation,
  passwordCrypt
}