const { response } = require('express');
const ContactUs = require('../models/contactUs');
// const contactUs = require('../models/contactUs');

const contactUsGet = async (req, res = response) => {
  //for skip an limit for pagination
    const { limit = 5, skip = 0 } = req.query;
    const validationQuery = { state: true };

    if(isNaN(Number(limit))||isNaN((Number(skip)))||Number(limit)==0){
      res.status(404).json({
        error: `Query params 'limit' and 'skip' must be valid numbers${ Number(limit)==0?", 'Limit' param couldn't be '0'":""}`
      })
    }

    const [ total, data ] = await Promise.all([
      ContactUs.countDocuments( validationQuery ),
      ContactUs.find( validationQuery )
          .skip( Number( skip ) ) //indicates starter data to fetch
          .limit( Number( limit ) )
    ])
    res.json({
        message: "Get API EndPoint from Controller",
        total: total,
        data
    })
 }

const contactUsPost = async (req, res = response) => {
    const { ...arg } = req.body;
    //Using a model from models->contactUs
    const contactUs = new ContactUs( { arg } );

    //save in DB
    contactUs.save()
    .then((contactUs)=>{
      res.json({
        message: "Post API EndPoint from Controller",
        contactUs
    })
    })
    .catch((error) => {
      res.status(400).json({
        status: 400,
        error: error.message
      });
    })
  }

const contactUsPut =  async(req, res = response) => {
    const id = req.params.id;
    const { ...arg } = req.body;

    await ContactUs.findOneAndUpdate( {_id: id}, arg )
    .then((contactUs)=>{
      res.json({
        message: "Put API EndPoint from Controller",
        contactUs
    })
    })
    .catch((error) => {
      res.status(400).json({
        status: 400,
        error: error.message
      });
    })
  }

const contactUsDelete = async (req, res = response) => {
    const { id } = req.params;
    const arg = { state: false };
    const authUser = req.user;

    //Turn to false some item
    if(!authUser) return;
    await ContactUs.findOneAndUpdate( {_id: id}, arg )
    .then((contactUs)=>{
      res.json({
        message: "Delete API EndPoint from Controller",
        contactUs, 
        //authUser
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
    contactUsGet, contactUsPost, contactUsPut, contactUsDelete
  }