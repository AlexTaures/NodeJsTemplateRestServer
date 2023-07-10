const userValidations = require('../middlewares/userValidations');
const  jwtValidations  = require('../middlewares/jwtValidations');
const roleValidations = require('../middlewares/roleValidations');

module.exports = {
  ...userValidations,
  ...jwtValidations,
  ...roleValidations
};