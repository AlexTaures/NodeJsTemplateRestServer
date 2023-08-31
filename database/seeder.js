const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Role = require('../models/role');
const User = require('../models/user');
const colors = require('colors');

const mongodbUri = process.env.MONGODB_CNN;
const roleNames = process.env.ROLE_SEED.split(',');
const [ seedName, seedEmail, seedPass, seedRole ] = process.env.USER_SEED.split(',');

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
              console.log(`Role "${roleName}" has been created in database`.green)
            })
            .catch((error) => {
              console.log(error.message.red)
            });

      }else{
        console.log(`Role "${roleName}" already exist in database`.yellow)
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }
};

const userSeeder = async () => {
  try {
    const user = await User.findOne({ name: seedName, email: seedEmail, role: seedRole });
    if(!user){
      
        const seedUSer = new User({
          name: seedName,
          email: seedEmail,
          password: seedPass,
          role: seedRole
        });
        await seedUSer.save()
          .then(() => {
            console.log(`User "${seedName}" has been created in database`.green)
          })

    }else{
      console.log(`Data for user "${seedName}" already exist in database`.yellow);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

const main = async () => {
  await mongoSeeder();
  await userSeeder();
  mongoose.disconnect(); // Mover esta línea aquí, después de completar el seeder
}

main();
