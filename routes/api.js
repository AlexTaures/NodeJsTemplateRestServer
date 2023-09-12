const userRoutes = require('./api/users');
const authRoutes = require('./api/auth')
const contactUsRoutes = require('./api/contactUs');
const { Router } = require('express') 
const { validateJWT } = require('../middlewares/')

const router = Router();

router.use('/contact_us',[validateJWT],contactUsRoutes);
router.use('/users', [validateJWT], userRoutes);
router.use('/auth', authRoutes);

module.exports = router;