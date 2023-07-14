const Brand = require('../models/Brand')
const Country = require('../models/Country')
const Color = require('../models/Color')
const BladeType = require('../models/BladeType')
const LockType = require('../models/LockType')
const brandMock = require('../mock/brands.json')
const countryMock = require('../mock/countries.json')
const colorMock = require('../mock/colors.json')
const bladeTypeMock = require('../mock/bladeTypes.json')
const lockTypeMock = require('../mock/lockTypes.json')

module.exports = async () => {
  const brands = await Brand.find()
  if (brands.length !== brandMock.length) {
    await createInitialEntity(Brand, brandMock)
  }

  const countries = await Country.find()
  if (countries.length !== countryMock.length) {
    await createInitialEntity(Country, countryMock)
  }

  const colors = await Color.find()
  if (colors.length !== colorMock.length) {
    await createInitialEntity(Color, colorMock)
  }

  const bladeTypes = await BladeType.find()
  if (bladeTypes.length !== bladeTypeMock.length) {
    await createInitialEntity(BladeType, bladeTypeMock)
  }

  const lockTypes = await LockType.find()
  if (lockTypes.length !== lockTypeMock.length) {
    await createInitialEntity(LockType, lockTypeMock)
  }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()
  return Promise.all(
    data.map(async item => {
      try {
        delete item.id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (e) {
        return e
      }
    })
  )
}
