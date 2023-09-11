const { Router } = require('express');
const { userGet, userPut, userPost, userDelete } = require('../../controllers/userController');
const { userValidations, isAdminRole, hasRole } = require('../../middlewares');

const router = Router();

router.get('/', [hasRole('USER_ROLE', 'ADMIN_ROLE')], userGet )
router.put('/:id', [userValidations, hasRole('USER_ROLE', 'ADMIN_ROLE')], userPut )
router.post('/', [userValidations, hasRole('USER_ROLE', 'ADMIN_ROLE')], userPost )
router.delete('/:id', [userValidations, isAdminRole], userDelete)




module.exports = router;