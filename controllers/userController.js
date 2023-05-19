const { response } = require('express');
const User = require('../models/user');

const userGet = (req, res = response) => {
    res.json({
        message: "Get API EndPoint from Controller"
    })
 }

const userPost = async (req, res = response) => {
    const { name, email, password, role } = req.body;
    //Using a model from models->user
    const user = new User( { name, email, password, role } );

    //verify if email exist
    
    const emailExist = await User.findOne({ email }); //Parent model function
    if(emailExist){
      res.status(400).json({
      msg: "The email sent already exist in DB",
    })};


    //save in DB
    user.save()
    .then((user)=>{
      res.json({
        message: "Post API EndPoint from Controller",
        user
    })
    })
    .catch((error) => {
      res.status(400).json({ 
        status: 400,
        error: error.message 
      });
    })
    

    // .then((user) => {
    //   // Send a JSON response with the newly created user
    //   res.json(user);
    // })
    // .catch((error) => {
    //   // Send a JSON response with the error message
    //   res.status(400).json({ error: error.message });
    // });
  }

const userPut = (req, res = response) => {
    res.json({
        message: "Put API EndPoint from Controller"
    })
  }

const userDelete = (req, res = response) => {
    res.json({
        message: "Delete API EndPoint from Controller"
    })
  }

  module.exports = {
    userGet, userPost, userPut, userDelete
  }