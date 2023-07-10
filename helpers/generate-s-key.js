try {
  const dotenv = require('dotenv');
  const fs = require('fs');
  const crypto = require('crypto');
  const { colors } = require('colors');

  // Generate a random secret key
  const generateSecretKey = () => {
    const key = crypto.randomBytes(32);
    return key.toString('hex');
  };

  const secretKey = generateSecretKey();

  const envFile = dotenv.parse(fs.readFileSync('.env'));
  envFile.SECRETORPRIVATEKEY = secretKey;
  const updatedEnvContent = Object.entries(envFile)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  fs.writeFileSync('.env', updatedEnvContent);
  console.log('success writing!!!!!'.green);
} catch (error) {
  console.log(error);
}
