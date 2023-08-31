const dotenv = require('dotenv');
const fs = require('fs');
const crypto = require('crypto');
const { colors } = require('colors');
const mongoose = require('mongoose');
const User = require('../models/user');

//Connect to database
dotenv.config();
const mongodbUri = process.env.MONGODB_CNN;

//Verificate if exist user data in connected database
const verificateUsers = async () => {
  let res = true;
  try {
    const users = await User.find();
    res = users?false:true;
  } catch (error) {
    throw error;
  }

}

// Generate a random secret key
const generateSecretKey = () => {
  const key = crypto.randomBytes(32);
  return key.toString('hex');
};

const main =  async () => {
  mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if(await verificateUsers()){
    try {
      const secretKey = generateSecretKey();
  
      const envFile = dotenv.parse(fs.readFileSync('.env'));
      envFile.SECRETORPRIVATEKEY = secretKey;
      const updatedEnvContent = Object.entries(envFile)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
      fs.writeFileSync('.env', updatedEnvContent);
      console.log('success writing!!!!!'.green);
    } catch (error) {
      console.log(error.red);
    }
  }else{
    console.log('There are user data in database, is not recomendable generate a new key'.yellow);
  }
  mongoose.disconnect();
}

main();








