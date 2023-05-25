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


 //ASYNC VALIDATIOS 
//Validates id

const idValidation = async (id) => {
  try {
    _id = await mongoose.models.User.findOne({ _id: id });
  //Validates if id is a mongoose id
  //   if(!check(id).isMongoId()){
  //     throw new Error(`The id: '${id}' is not a mongo id`)
  //  }
  
    if(!_id){
      console.log(`The id: '${id}' doesn't exist in DataBase`.red)
      throw new Error(`The id: '${id}' doesn't exist in DataBase`);
    }
      return true;
  } catch (error) {
    throw error;
  }
}


//Validates if email exist
const emailExist = async(user) => {
 try {
  user = await mongoose.models.User.findOne({ email: user.email });
  if(user){
    console.log(`The email '${user.email}' already exist in DataBase`.red);
    throw new Error(`The email '${user.email}' already exist in DataBase`);
  }else{
    return true;
  }
 } catch (error) {
    throw error;
 }
}

module.exports = {
  emailValidation, 
  passwordValidation,
  passwordCrypt,
  roleValidation,
  idValidation,
  emailExist
}