const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
)

module.exports = model('Cart', schema)
