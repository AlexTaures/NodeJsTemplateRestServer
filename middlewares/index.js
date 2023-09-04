const userValidations = require('../middlewares/userValidations');
const  jwtValidations  = require('../middlewares/jwtValidations');
const roleValidations = require('../middlewares/roleValidations');
const contactUsValidations = require('../middlewares/contactUsValidations')

module.exports = {
  ...userValidations,
  ...jwtValidations,
  ...roleValidations,
  ...contactUsValidations
};