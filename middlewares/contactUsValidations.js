const { mongoose, mongo } = require('mongoose');

const idValidation = async (id) => {
  if(!mongoose.Types.ObjectId.isValid(id)){
    console.log(`The id: '${id}' is not valid Mongo ID`.red)
    throw new Error(`The id: '${id}' is not valid Mongo ID`);
  }
  try {
    _id = await mongoose.models.ContactUS.findOne({ _id: id });  //PROBAR CON FALSO STATE

    if(!_id){
      console.log(`The id: '${id}' doesn't exist in DataBase`.red)
      throw new Error(`The id: '${id}' doesn't exist in DataBase`);
    }

  } catch (error) {
    throw error;
  }
}

const contactUsValidations = async ( request, response, next ) => {
  const _id = request.params.id;

 try {
  _id?await idValidation(_id): 0;


  next()
 } catch (err) {
  response.status(400).json({
    method: request.method,
    error: err.message
  })
 }
}

module.exports = {
  contactUsValidations
}