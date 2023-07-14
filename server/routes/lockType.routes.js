const express = require('express')
const LockType = require('../models/LockType')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  try {
    const list = await LockType.find()
    res.status(200).send(list)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.',
    })
  }
})

module.exports = router
