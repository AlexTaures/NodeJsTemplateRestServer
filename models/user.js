const { Schema, model } = require('mongoose');
const emailValidator = require('email-validator');
const { emailValidation } = require('../middlewares/userValidators')

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
    required: [true, "Required password"]
  },
  img: {
    type: String 
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE']
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


module.exports = model('User', UserSchema);