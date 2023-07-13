const { response } = require('express')
const emailValidator = require('email-validator');
const colors = require('colors');
const bcryptjs = require('bcryptjs');
const Role = require('../models/role');
const { mongoose, mongo } = require('mongoose');


//Email Type Validation
const emailValidation =  (email) => {
  var validator = emailValidator.validate(email);
  if(!validator){
    console.log(`The email '${email}' is not a valid Email value`.red);
    throw new Error(`The email '${email}' is not a valid Email value`)
  };
}

//Email Exist Validation
const emailExist = async (email) => {
  try {
    const user = await mongoose.models.User.findOne({ email: email });
    if(user){
      console.log(`The email: '${email}' already exist in DataBase`.red);
      throw new Error(`The email: '${email}' already exist in DataBase`);
    }
  } catch (error) {
    throw error
  }
}

//Role Validation
const roleValidation = async (_role) => {
  try {
    const role = await mongoose.models.Role.findOne({ role: _role });
    if(!role){
      console.log(`The role '${_role}' is not registered in DataBase`.red);
      throw new Error(`The role '${_role}' is not registered in DataBase`);
    }
  } catch (error) {
    throw error
  }
}

//Password validation and crypt
const passwordValidation = (password) => {
  if(password.length !== 6){
    console.log(`Password lenght is: ${password.length}, must have 6 characters`.red);
    throw new Error(`Password lenght is: ${password.length}, must have 6 characters`)
  }
  const salt = bcryptjs.genSaltSync(); //<<--default (10), steps for crypt
  password = bcryptjs.hashSync( password, salt );
  return password;
}

//ID Validations
const idValidation = async (id) => {
  if(!mongoose.Types.ObjectId.isValid(id)){
    console.log(`The id: '${id}' is not valid Mongo ID`.red)
    throw new Error(`The id: '${id}' is not valid Mongo ID`);
  }
  try {
    _id = await mongoose.models.User.findOne({ _id: id });  //PROBAR CON FALSO STATE

    if(!_id){
      console.log(`The id: '${id}' doesn't exist in DataBase`.red)
      throw new Error(`The id: '${id}' doesn't exist in DataBase`);
    }

  } catch (error) {
    throw error;
  }
}



const userValidations = async ( request, response, next ) => {
  const { email, role } = request.body;
  let { password } = request.body;
  const _id = request.params.id;

 try {
  email?emailValidation(email): 0;
  request.method=='POST'?await emailExist(email): 0;
  role? await roleValidation(role): 0;
  password?request.body.password = passwordValidation(password): 0;
  _id?await idValidation(_id): 0;


  next()
 } catch (err) {
  response.status(400).json({
    method: request.method,
    error: err.message
  })
 }
}


module.exports = {
  userValidations,
  emailValidation,
  emailExist,
  passwordValidation,
  roleValidation
}