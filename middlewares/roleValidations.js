const { response } = require("express");
const { roleValidation } = require('./userValidations');

const isAdminRole = (req, res = response, next) => {

  const { role, name } = req.user;

  if(role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: 'Unauthorized Action / Not Allowed Role'
    })
  }

  next();
}

const hasRole = (...roles) => {
  return async (req, res = response, next) => {
    try {
      for (const role of roles) {
        await roleValidation(role);
      }

      if (!roles.includes(req.user.role)) {
        return res.status(401).json({
          msg: 'Permission Denied, Role Verification Failure'
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        msg: error.message
      });
    }
  };
};



module.exports = {
  isAdminRole,
  hasRole
}