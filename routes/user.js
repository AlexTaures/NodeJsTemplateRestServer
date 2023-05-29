const { Router } = require('express');
const { userGet, userPut, userPost, userDelete } = require('../controllers/userController');
const { userValidations } = require('../middlewares/userValidations')


const router = Router();

router.get('/', userGet )
router.put('/:id', userValidations, userPut )
router.post('/', userValidations, userPost )
router.delete('/:id', userValidations, userDelete)




module.exports = router;