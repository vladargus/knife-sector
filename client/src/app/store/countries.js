import { createSlice } from '@reduxjs/toolkit'
import countryService from '../services/country.service'

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    countriesRequested: (state) => {
      state.isLoading = true
    },
    countriesReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    countriesRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: countriesReducer, actions } = countriesSlice
const { countriesRequested, countriesReceived, countriesRequestFailed } =
  actions

export const loadCountriesList = () => async (dispatch) => {
  dispatch(countriesRequested())
  try {
    const { content } = await countryService.get()
    dispatch(countriesReceived(content))
  } catch (error) {
    dispatch(countriesRequestFailed(error.message))
  }
}

export const getCountries = () => (state) => state.countries.entities
export const getCountriesLoadingStatus = () => (state) =>
  state.countries.isLoading

export default countriesReducer
