const { Schema, model } = require('mongoose');
const emailValidator = require('email-validator');
const { emailValidation, passwordValidation, passwordCrypt, roleValidation } = require('../middlewares/userSchemaValidators')

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
UserSchema.pre('save', function() {
  this.password = passwordCrypt(this.password);
});

//Without arrow function, hiddes some keys from jsonResponse
UserSchema.methods.toJSON = function(){
  const {__v, password, ...userJson } = this.toObject();
  return userJson;
}

module.exports = model('User', UserSchema);