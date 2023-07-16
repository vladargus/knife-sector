const express = require('express')
const Cart = require('../models/Cart')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true })

router.get('/', auth, async (req, res) => {
  try {
    const list = await Cart.find()
    res.status(200).send(list)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.',
    })
  }
})

router
  .route('/:cartId')
  .post(auth, async (req, res) => {
    try {
      const newCart = await Cart.create(req.body)
      res.status(201).send(newCart)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже.',
      })
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const { cartId } = req.params

      const updatedCart = await Cart.findByIdAndUpdate(cartId, req.body, {
        new: true,
      })

      res.status(200).send(updatedCart)
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже.',
      })
    }
  })
  .delete(auth, async (req, res) => {
    try {
      const { cartId } = req.params

      const removedItem = await Cart.findById(cartId)

      await removedItem.remove()

      return res.send(null)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже.',
      })
    }
  })

module.exports = router
