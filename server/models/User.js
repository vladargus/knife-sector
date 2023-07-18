const { Schema, model, trusted } = require('mongoose')

const schema = new Schema(
  {
    name: String,
    surname: String,
    phone: String,
    email: { type: String, required: true, unique: trusted },
    password: String,
    isAdmin: Boolean,
    favorites: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
)

module.exports = model('User', schema)
