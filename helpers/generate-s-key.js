const dotenv = require('dotenv');
const fs = require('fs');
const crypto = require('crypto');
const { colors } = require('colors');
const mongoose = require('mongoose');
const User = require('../models/user');
const readline = require('readline');

const keyName = 'SECRETORPRIVATEKEY';

//Connect to database
dotenv.config();
const mongodbUri = process.env.MONGODB_CNN;
const forceFlag = process.argv.includes('--force') //npm run generate-key --  --force

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

//Set content to write en .env file
const setNewEnvContent = (newKey) => {
  let newFileContent = [];
  const fileContent = fs.readFileSync('.env', 'utf-8').split('\n');
  fileContent.forEach((line, index) => {
    if(line.includes(keyName)){
      //let key = line.replace(/\s/g, '').trim().replace(`${keyName}=`,''); //To obtain current key
      line = `${keyName}=${newKey}`;
    }
    newFileContent[index] = line;
  });
  return newFileContent.join('\n');
}

//Main function 
const main =  async () => {
  mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if( await verificateUsers() || forceFlag ){
    try {
      const secretKey = generateSecretKey();
      
      fs.writeFileSync('.env', setNewEnvContent(secretKey));
      console.log('Key generated successfully!!!!!!'.green);
    } catch (error) {
      console.log(error.red);
    }
  }else{
    console.log('There are user data in database, is not recomendable generate a new key.'.yellow);
    console.log('To force key generation exec command line:'.yellow+' npm run generate-key -- --force ');
  }
  mongoose.disconnect();
}


if(forceFlag){
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  console.log('Generating a new key could affect reading already registered passwords.\nAre you sure you want to generate a new secret key? [Yes/~else]): '.blue);
  //reader.question();
  reader.on('line', (res) => {
    if (res.toLowerCase() !== 'yes') {
      console.log('Key generation aborted.'.yellow);
    }else{
      main();
    }

    reader.close();
  });
}else{
  main();
}

