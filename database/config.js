const mongoose = require('mongoose');
const colors = require('colors');

const dbConnection = async(error) => {    
  count = 1;
  maxTries = 10;
  while(true) {
    try {
      await mongoose.connect(process.env.MONGODB_CNN);
      console.log('Online Database connected'.blue);
      return;
    
    } catch (error) {
      console.log(`Error establishing connection to online database, attemping again ${count}`.magenta)
        if (++count == maxTries) throw error;
    }
}
  
  



  // try {
  //   await mongoose.connect(process.env.MONGODB_CNN);
  //     console.log('Online Database connected');

  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //     console.log('Error establishing connection to online database')
  //   }

}





module.exports = {
  dbConnection
}