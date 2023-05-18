const mongoose = require('mongoose');

const dbConnection = async(error) => {    
  count = 1;
  maxTries = 3;
  while(true) {
    try {
      await mongoose.connect(process.env.MONGODB_CNN);
      console.log('Online Database connected');
      return;
    
    } catch (error) {
      console.log(`Error establishing connection to online database, attemping again ${count}`)
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