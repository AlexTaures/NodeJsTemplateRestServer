const { Schema, model } = require('mongoose');

ContactUsSchema = Schema({
  name: {
    type: String,
    required: [true, "Required name"]
  },
  email: {
    type: String,
    required: [true, "Required email"],
    unique: true,
  },
  company: {
    type: String,
    required: [true, "Required company"],
  },
  message: {
    type: String,
    required: [true, "Required message"],
  },
  state: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: new Date()
  }
});

module.exports = model('ContactUS', ContactUsSchema);