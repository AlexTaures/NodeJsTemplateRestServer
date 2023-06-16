const { Schema, model } = require('mongoose');

UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Required name"]
  },
  email: {
    type: String,
    required: [true, "Required email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Required password"],
  },
  img: {
    type: String 
  },
  role: {
    type: String,
    required: [true,'Role is required'],
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

//Without arrow function, hiddes some keys from jsonResponse
UserSchema.methods.toJSON = function(){
  const {__v, password, _id, ...userJson } = this.toObject();
  userJson.uid = _id;
  return userJson;
}

module.exports = model('User', UserSchema);