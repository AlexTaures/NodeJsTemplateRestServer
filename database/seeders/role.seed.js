const { mongoose } = require('mongoose');

const Role = mongoose.model('role');

//const roleNames = ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'];
const roleNames = process.env.ROLE_SEED
console.log(roleNames)

// roleNames.forEach(roleName => {
//   Role.findOne({ role: roleName }, (err, role) => {
//     if (err) {
//       console.error(err);
//     } else if (role) {
//       console.log(`Role ${role.role} exists`);
//     } else {
//       console.log(`Role ${roleName} does not exist`);
//     }
//   });
// });