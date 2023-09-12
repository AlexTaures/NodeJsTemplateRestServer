const { Router } = require('express');
const { contactUsGet, contactUsPut, contactUsPost, contactUsDelete } = require('../../controllers/contactUsController');
const { userValidations, validateJWT, isAdminRole, hasRole, contactUsValidations } = require('../../middlewares');

const router = Router();

router.get('/', [hasRole('USER_ROLE', 'ADMIN_ROLE')], contactUsGet )
router.put('/:id', [contactUsValidations], contactUsPut )
router.post('/', [contactUsValidations], contactUsPost )
router.delete('/:id', [contactUsValidations], contactUsDelete)




module.exports = router;