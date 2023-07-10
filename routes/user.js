const { Router } = require('express');
const { userGet, userPut, userPost, userDelete } = require('../controllers/userController');
// const { userValidations } = require('../middlewares/userValidations');
// const { validateJWT } = require('../middlewares/jwtValidations');
// const { isAdminRole, hasRole } = require('../middlewares/roleValidations');
const { userValidations, validateJWT, isAdminRole, hasRole } = require('../middlewares');


const router = Router();

router.get('/', validateJWT, hasRole('SALES_ROLE', 'ADMIN_ROLE'), userGet )
router.put('/:id', userValidations, userPut )
router.post('/', userValidations, userPost )
router.delete('/:id', validateJWT, userValidations, isAdminRole, userDelete)




module.exports = router;