const { Schema, model } = require('mongoose');
const emailValidator = require('email-validator');
const { emailValidation, passwordValidation, passwordCrypt } = require('../middlewares/userSchemaValidators')

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

UserSchema.pre('save', function() {
  this.password = passwordCrypt(this.password);
});

module.exports = model('User', UserSchema);