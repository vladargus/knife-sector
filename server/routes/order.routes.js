const express = require('express')
const Order = require('../models/Order')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const list = await Order.find()
      res.status(200).send(list)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже.',
      })
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newOrder = await Order.create(req.body)
      res.status(201).send(newOrder)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже.',
      })
    }
  })

router.patch('/:orderId', auth, async (req, res) => {
  try {
    const { orderId } = req.params

    const updatedOrders = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    })

    res.status(200).send(updatedOrders)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.',
    })
  }
})

module.exports = router
