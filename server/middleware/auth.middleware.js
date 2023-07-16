const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGIxMjM0ODcxZDNmY2E2YjJiZjQxMjYiLCJpYXQiOjE2ODk0OTIyNDQsImV4cCI6MTY4OTQ5NTg0NH0.5mldstzua8PHNQN1z04rLJVSzwp1MHBn1mWqiWXDNAI
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const data = tokenService.validateAccess(token)

    if (!data) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.user = data

    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
