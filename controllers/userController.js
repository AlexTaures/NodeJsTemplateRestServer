const { response } = require('express');

const userGet = (req, res = response) => {
    res.json({
        message: "Get API EndPoint from Controller"
    })
 }

const userPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        message: "Post API EndPoint from Controller",
        nombre,edad
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