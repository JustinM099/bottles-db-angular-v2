const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bottleRoutes = require('./bottleRoutes');



router.use('/bottles', bottleRoutes);
router.use('/users', userRoutes);


module.exports = router;