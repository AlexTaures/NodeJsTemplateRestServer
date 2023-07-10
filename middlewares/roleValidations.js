const { response } = require("express")


const isAdminRole = (req, res = response, next) => {
  
  const { role, name } = req.user;

  if(role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: 'Unauthorized Action / Not Allowed Role'
    })
  }

  next();
}

const hasRole = ( ...roles ) => {
   
  return (req, res = response, next ) => {
    
    if(!roles.includes(req.user.role)){
      return res.status(401).json({
        msg: 'Permision Denied, Role Verification Failure'
      })
    }

    next();
  }
}


module.exports = {
  isAdminRole,
  hasRole
}