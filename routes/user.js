const { Router } = require('express');
const { userGet, userPut, userPost, userDelete } = require('../controllers/userController');

const router = Router();

router.get('/', userGet )
router.put('/', userPut )
router.post('/',userPost )
router.delete('/', userDelete)




module.exports = router;