const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    brand: String,
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
    bladeType: String,
    lockType: String,
    color: String,
    country: String,
    weight: String,
    link: String,
  },
  {
    timestamps: true,
  }
)

module.exports = model('Knife', schema)
