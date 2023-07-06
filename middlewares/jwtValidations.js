const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validateJWT = async ( request, response, next ) => {

  const token = request.header('x-token')

  if(!token){
    response.status(401).json({
      message: 'AUTHENTICATION FAILURE',
      error: 'No token in fetched data'
    })
  }

  try {
    
    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    //validate user model by uid
    const user = await User.findById( uid );
    
    //Verificate state active
    if(!user.state){
      response.status(401).json({
        message: 'AUTHENTICATION FAILURE',
        error: 'Invalid token - Inactive user'
      })
      return;
    }


    request.user = user; //return authUser
    
  } catch (error) {
    console.log(error)
    response.status(401).json({
      message: 'AUTHENTICATION FAILURE',
      error: 'Invalid token'
    })
    return;
  }

  next();
}

module.exports = {
  validateJWT
}