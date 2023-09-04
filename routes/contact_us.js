const { Router } = require('express');
const { contactUsGet, contactUsPut, contactUsPost, contactUsDelete } = require('../controllers/contactUsController');
const { userValidations, validateJWT, isAdminRole, hasRole, contactUsValidations } = require('../middlewares');

const router = Router();

router.get('/', validateJWT, hasRole('USER_ROLE', 'ADMIN_ROLE'), contactUsGet )
router.put('/:id',validateJWT, contactUsValidations, contactUsPut )
router.post('/',validateJWT, contactUsValidations, contactUsPost )
router.delete('/:id', validateJWT, contactUsValidations, contactUsDelete)




module.exports = router;