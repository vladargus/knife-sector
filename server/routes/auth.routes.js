const express = require('express')
const router = express.Router({ mergeParams: true })

// /api/auth/signUp
router.post('/signUp', async (req, res) => {})

// /api/auth/signInWithPassword
router.post('/signInWithPassword', async (req, res) => {})

// /api/auth/token
router.post('/token', async (req, res) => {})

module.exports = router
