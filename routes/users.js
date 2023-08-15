const { Router } = require('express');
const { userGet, userPut, userPost, userDelete } = require('../controllers/userController');
const { userValidations, validateJWT, isAdminRole, hasRole } = require('../middlewares');

const router = Router();

router.get('/', validateJWT, hasRole('USER_ROLE', 'ADMIN_ROLE'), userGet )
router.put('/:id',validateJWT, userValidations, hasRole('USER_ROLE', 'ADMIN_ROLE'), userPut )
router.post('/',validateJWT, userValidations, hasRole('USER_ROLE', 'ADMIN_ROLE'), userPost )
router.delete('/:id', validateJWT, userValidations, isAdminRole, userDelete)




module.exports = router;