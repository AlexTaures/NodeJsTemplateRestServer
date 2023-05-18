const { response } = require('express');
const User = require('../models/user');

const userGet = (req, res = response) => {
    res.json({
        message: "Get API EndPoint from Controller"
    })
 }

const userPost = async (req, res = response) => {
    const body = req.body;
    //Using a model from models->user
    const user = new User( body );
    await user.save();
    res.json({
        message: "Post API EndPoint from Controller",
        user
    })
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