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
  }

const userPut =  async(req, res = response) => {
    const id = req.params.id;
    const { password, google, ...arg } = req.body;
    
    if(password){
      arg.password = password;
    }
    //const user = await User.findOneAndUpdate( {_id: id}, arg );
    await User.findOneAndUpdate( {_id: id}, arg )
    .then((user)=>{
      res.json({
        message: "Put API EndPoint from Controller",
        user
    })
    })
    .catch((error) => {
      res.status(400).json({ 
        status: 400,
        error: error.message 
      });
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