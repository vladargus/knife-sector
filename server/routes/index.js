const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/knife', require('./knife.routes'))
router.use('/brand', require('./brand.routes'))
router.use('/country', require('./country.routes'))
router.use('/color', require('./color.routes'))
router.use('/bladeType', require('./bladeType.routes'))
router.use('/lockType', require('./lockType.routes'))
router.use('/cart', require('./cart.routes'))
router.use('/order', require('./order.routes'))

module.exports = router
