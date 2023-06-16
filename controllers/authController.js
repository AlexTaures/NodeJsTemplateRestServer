const { response } = require('express')
const { generateJWT } = require('../helpers/generate-jwt')

const login = async (req, res = response) => {

  const { id: uid } = req.body;

  try {
    
    //Generate JWT
    const token = await generateJWT( uid );

    res.json({
      message: 'login succesfully',
      uid,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 500,
      message: "Something wrong with internal server"
    })
    
  }
}

module.exports = { 
  login
};