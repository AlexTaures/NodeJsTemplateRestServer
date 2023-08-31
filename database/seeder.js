const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Role = require('../models/role')
const colors = require('colors');

const mongodbUri = process.env.MONGODB_CNN;
const roleNames = process.env.ROLE_SEED.split(',');

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoSeeder = async () => {
  for (const roleName of roleNames) {
    try {
      const role = await Role.findOne({role:roleName});
      if(!role){
        const currentRole = new Role({ role: roleName });

      await currentRole.save()
        .then(() => {
          console.log(`Role ${roleName} has been created`.green)
        })
        .catch((error) => {
          console.log(error.message.red)
        });
      }else{
        console.log(`Role ${roleName} is already exist in database`.yellow)
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }
};

const main = async () => {
  await mongoSeeder();
  mongoose.disconnect(); // Mover esta línea aquí, después de completar el seeder
}

main();
