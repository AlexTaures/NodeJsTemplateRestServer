const { Router } = require('express');
const { contactUsGet, contactUsPut, contactUsPost, contactUsDelete } = require('../controllers/contactUsController');
const { userValidations, validateJWT, isAdminRole, hasRole } = require('../middlewares');

const router = Router();

router.get('/', validateJWT, hasRole('USER_ROLE', 'ADMIN_ROLE'), contactUsGet )
router.put('/:id',validateJWT, userValidations, hasRole('USER_ROLE', 'ADMIN_ROLE'), contactUsPut )
router.post('/',validateJWT, userValidations, hasRole('USER_ROLE', 'ADMIN_ROLE'), contactUsPost )
router.delete('/:id', validateJWT, userValidations, isAdminRole, contactUsDelete)




module.exports = router;