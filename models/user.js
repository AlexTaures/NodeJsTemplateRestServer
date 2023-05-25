const { Schema, model } = require('mongoose');
const emailValidator = require('email-validator');
const { emailValidation, passwordValidation, passwordCrypt, roleValidation, emailExist, idValidation } = require('../middlewares/userSchemaValidators')

UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Required name"]
  },
  email: {
    type: String,
    validate:{
      validator: props => emailValidation(props),
      message: props => `"${props.value}" is not a valid email`
    },
    required: [true, "Required email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Required password"],
    validate:{
      validator: props => passwordValidation(props),
      message: "The password must have 6 characters"
    }
  },
  img: {
    type: String 
  },
  role: {
    type: String,
    required: [true,'Role is required'],
    validate: {
      validator: props => roleValidation(props),
      message: props => `${props.value} is not registered in DataBase`
    }
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

//SchemaMethods

//Crypt password
UserSchema.pre('save',async function(next) {
  this.password = passwordCrypt(this.password);
  //Comprobates if email exist

  try {
    await emailExist(this)
  } catch (error) {
    throw error;
  }
});

//Validations at update**********************
UserSchema.pre('findOneAndUpdate', async function(next) {
  //console.log(this._conditions._id);

  //Validates id
  try {
    await idValidation(this._conditions._id);
  } catch (error) {
    throw error;
  }

  // Crypt and validates password if being updated
  if (this._update.password) {
    if(!passwordValidation(this._update.password)){
      throw new Error(`The password must have 6 characters`)
    }
    this._update.password = passwordCrypt(this._update.password);
  }

  // Validates Rol integration
  if(this._update.role){
    if(!await roleValidation(this._update.role)){
      console.log(this._update.role);
      throw new Error(`${this._update.role} is not registered in DataBase`);
    };
  }

  // Comprobates if email exists if being updated
  if(this._update.email){
  try {
    await emailExist(this._update)
  } catch (error) {
    throw error;
  }
  }


});


//Without arrow function, hiddes some keys from jsonResponse
UserSchema.methods.toJSON = function(){
  const {__v, password, ...userJson } = this.toObject();
  return userJson;
}

module.exports = model('User', UserSchema);