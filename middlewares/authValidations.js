const { response } = require('express')
const emailValidator = require('email-validator');
const colors = require('colors');
const bcryptjs = require('bcryptjs');
//const Role = require('../models/role');
const { mongoose, mongo } = require('mongoose');
const { emailValidation, passwordValidation } = require('./userValidations')


//Check required params
const authCheckRequired =  (email, password) => {
  if(!email){
    console.log(`The email is required`.red);
    throw new Error(`The email is required`)
  };
  if(!password){
    console.log(`The password is required`.red);
    throw new Error(`The password is required`)
  };
}

//Email Exist Validation
const userVerification = async (email, password) => {
  try {
    const user = await mongoose.models.User.findOne({ email: email });

    if(!user){
      console.log(`The email: '${email}' doesn't exist in DataBase`.red);
      throw new Error(`The email: '${email}' doesn't exist in DataBase`);
    }

    if(user.state === false){
      console.log('The user is not active'.yellow);
      throw new Error('The user is not active')
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if(!validPassword){
      console.log('Incorrect password'.red);
      throw new Error('Incorrect password');
    }
    
    return user.id
  } catch (error) {
    throw error
  }
}



const authValidations = async ( request, response, next ) => {
  const { email, password } = request.body;

 try {
  authCheckRequired(email, password);
  emailValidation(email);
  passwordValidation(password);
  request.body.id = await userVerification(email, password);
  
  next();

 } catch (err) {
  response.status(400).json({
    message: 'AUTHENTICATION FAILURE',
    error: err.message
  })
 }
}


module.exports = {
  authValidations
}