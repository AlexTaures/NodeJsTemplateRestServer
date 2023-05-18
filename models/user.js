const { Schema, model } = require('mongoose');
UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Required name"]
  },
  email: {
    type: String,
    required: [true, "Required email"],
    unique: true
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