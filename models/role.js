const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'Required rol']
  }
});

module.exports = model('Role', RoleSchema);