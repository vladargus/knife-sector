const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    name: String,
    surname: String,
    phone: String,
    email: { type: String, required: true, unique: trusted },
    password: String,
    isAdmin: Boolean,
  },
  {
    timestamps: true,
  }
)

module.exports = model('User', schema)
