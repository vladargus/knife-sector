const express = require('express')
const Knife = require('../models/Knife')
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')
const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(async (req, res) => {
    try {
      const list = await Knife.find()
      res.status(200).send(list)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже.',
      })
    }
  })
  .post(auth, admin, async (req, res) => {
    try {
      const newKnife = await Knife.create(req.body)
      res.status(201).send(newKnife)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже.',
      })
    }
  })

router
  .route('/:knifeId')
  .patch(auth, admin, async (req, res) => {
    try {
      const { knifeId } = req.params

      const updatedKnife = await Knife.findByIdAndUpdate(knifeId, req.body, {
        new: true,
      })

      res.status(200).send(updatedKnife)
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже.',
      })
    }
  })
  .delete(auth, admin, async (req, res) => {
    try {
      const { knifeId } = req.params

      const removedKnife = await Knife.findById(knifeId)
      await removedKnife.deleteOne()

      return res.send(null)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже.',
      })
    }
  })

module.exports = router
