const { Router } = require('express');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/userController');
const { userValidations } = require('../middlewares/userValidators')


const router = Router();

router.get('/', userGet )
router.put('/:id', userPut )
router.post('/',userPost )
router.delete('/:id', userDelete)
//Erase later
router.patch('/:id',userValidations, userPatch )



module.exports = router;