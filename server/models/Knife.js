const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    model: String,
    price: String,
    image: String,
    info: String,
    steelInfo: String,
    handleInfo: String,
    overallLength: String,
    bladeLength: String,
    bladeThickness: String,
    hardness: String,
    bladeMaterial: String,
    handleMaterial: String,
    bladeType: {
      type: Schema.Types.ObjectId,
      ref: 'BladeType',
      required: true,
    },
    lockType: { type: Schema.Types.ObjectId, ref: 'LockType', required: true },
    color: { type: Schema.Types.ObjectId, ref: 'Color', required: true },
    country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
    weight: String,
    link: String,
  },
  {
    timestamps: true,
  }
)

module.exports = model('Knife', schema)
