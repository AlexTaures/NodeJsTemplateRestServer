const emailValidator = require('email-validator');
const colors = require('colors');
const bcryptjs = require('bcryptjs');
const Role = require('../models/role');
const { mongoose } = require('mongoose');


//*******Schema Validation Functions*************
//Validates the correct email format
const emailValidation = async (email) => {
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



//Makes comparation between the sent role and the role list saved in database
const roleValidation = async (role) => {
  const roleExist = await Role.findOne({ role });
  if(!roleExist){
      console.log(`${role} is not registered in DataBase`.red);
      return false;
    }
    
  return true;
}



///*************Schema Methods*************** */
//Creates the hash for password before save
const passwordCrypt = (password) => {
  const salt = bcryptjs.genSaltSync(); //<<--default (10), steps for crypt
    if(password){
      password = bcryptjs.hashSync( password, salt );
    }
    return password;
  }

//Validates if email exist
const emailExist = (user, next) => {
  mongoose.models.User.findOne({ email: user.email })
  .then(existingUser => {
    if (existingUser) {
      // Email already exists, handle the error
      console.log(`The email '${user.email}' already exists`.red);
      throw new Error(`The email '${user.email}' already exists`);
    }

    // Email does not exist, proceed to save the user
    next();
  })
  .catch(err => {
    next(err);
  });
}

module.exports = {
  emailValidation, 
  passwordValidation,
  passwordCrypt,
  roleValidation,
  emailExist
}