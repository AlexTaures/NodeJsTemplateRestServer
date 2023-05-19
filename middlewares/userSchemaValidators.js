const emailValidator = require('email-validator');
const colors = require('colors');
const bcryptjs = require('bcryptjs');
const Role = require('../models/role');


//Validates the correct email format
const emailValidation = (email) => {
  var validator = emailValidator.validate(email);
  if(!validator){
    console.log("Invalid sent email".red);
  };
  return validator;
}
//Validates the password length
const passwordValidation = (password) => {
  if(password.length !== 6){
    console.log(`Password lenght is: ${password.length}, must have 6 characters`.red);
    return false;
  }
  return true;
}

//Creates the hash for password before save
const passwordCrypt = (password) => {
const salt = bcryptjs.genSaltSync(); //<<--default (10), steps for crypt
  if(password){
    password = bcryptjs.hashSync( password, salt );
  }
  return password;
}

//Makes comparation between the sent role and the role list saved in database
const roleValidation = async (role) => {
  const roleExist = await Role.findOne({ role });
  if(!roleExist){
      console.log(`${role} is not registered in DataBase`.red);
      return false;
    }
    
  return true;
}

module.exports = {
  emailValidation, 
  passwordValidation,
  passwordCrypt,
  roleValidation
}