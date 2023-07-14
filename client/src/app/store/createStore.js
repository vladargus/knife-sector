import { combineReducers, configureStore } from '@reduxjs/toolkit'
import knivesReducer from './knives'
import brandsReducer from './brands'
import colorsReducer from './colors'
import countriesReducer from './countries'
import bladeTypesReducer from './bladeTypes'
import lockTypesReducer from './lockTypes'
import usersReducer from './users'
import cartReducer from './cart'
import orderReducer from './order'

const rootReducer = combineReducers({
  users: usersReducer,
  cart: cartReducer,
  order: orderReducer,
  knives: knivesReducer,
  brands: brandsReducer,
  colors: colorsReducer,
  countries: countriesReducer,
  bladeTypes: bladeTypesReducer,
  lockTypes: lockTypesReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}
