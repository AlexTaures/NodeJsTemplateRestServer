const mongoose = require('mongoose');

const dbConnection = async() => {

  try {
    await mongoose.connect(process.env.MONGODB_CNN);
      console.log('Online Database connected');

    } catch (error) {
      console.log('Error establishing connection to online database')
    }

}





module.exports = {
  dbConnection
}