const { response } = require('express');
const User = require('../models/user');
// const user = require('../models/user');

const userGet = async (req, res = response) => {
  //for skip an limit for pagination
    const { limit = 5, skip = 0 } = req.query;
    const validationQuery = { state: true };

    if(isNaN(Number(limit))||isNaN((Number(skip)))||Number(limit)==0){
      res.status(404).json({
        error: `Query params 'limit' and 'skip' must be valid numbers${ Number(limit)==0?", 'Limit' param couldn't be '0'":""}`
      })
    }

    const [ total, users ] = await Promise.all([
      User.countDocuments( validationQuery ),
      User.find( validationQuery )
          .skip( Number( skip ) ) //indicates starter data to fetch
          .limit( Number( limit ) )
    ])
    res.json({
        message: "Get API EndPoint from Controller",
        total: total,
        users
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

const userDelete = async (req, res = response) => {
    const { id } = req.params;
    const arg = { state: false };
    const authUser = req.user;

    //Turn to false some item
    await User.findOneAndUpdate( {_id: id}, arg )
    .then((user)=>{
      res.json({
        message: "Delete API EndPoint from Controller",
        user, authUser
    })
    })
    .catch((error) => {
      res.status(400).json({ 
        status: 400,
        error: error.message 
      });
    })   
    
  }

  module.exports = {
    userGet, userPost, userPut, userDelete
  }