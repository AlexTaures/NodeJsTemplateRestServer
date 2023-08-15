const { Router } = require('express');
const { login } = require('../controllers/authController');
//const { userValidations } = require('../middlewares/userValidations');
const { authValidations } = require('../middlewares/authValidations');

const router = Router();

router.post('/login', authValidations, login );

module.exports = router;