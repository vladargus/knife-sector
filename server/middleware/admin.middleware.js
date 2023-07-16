const User = require('../models/User')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(403).json({ message: 'User must be provided' })
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Permission denied' })
    }

    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
