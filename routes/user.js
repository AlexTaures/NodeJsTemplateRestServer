const { Router } = require('express');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/userController');
const { userValidations } = require('../middlewares/userValidators')


const router = Router();

router.get('/', userGet )
router.put('/:id', userValidations, userPut )
router.post('/', userValidations, userPost )
router.delete('/:id', userDelete)




module.exports = router;