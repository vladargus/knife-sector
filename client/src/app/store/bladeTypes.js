import { createSlice } from '@reduxjs/toolkit'
import bladeTypeService from '../services/bladeType.service'

const bladeTypesSlice = createSlice({
  name: 'bladeTypes',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    bladeTypesRequested: (state) => {
      state.isLoading = true
    },
    bladeTypesReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    bladeTypesRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: bladeTypesReducer, actions } = bladeTypesSlice
const { bladeTypesRequested, bladeTypesReceived, bladeTypesRequestFailed } =
  actions

export const loadBladeTypesList = () => async (dispatch) => {
  dispatch(bladeTypesRequested())
  try {
    const { content } = await bladeTypeService.get()
    dispatch(bladeTypesReceived(content))
  } catch (error) {
    dispatch(bladeTypesRequestFailed(error.message))
  }
}

export const getBladeTypes = () => (state) => state.bladeTypes.entities
export const getBladeTypesLoadingStatus = () => (state) =>
  state.bladeTypes.isLoading
export const getBladeTypeById = (id) => (state) => {
  if (state.bladeTypes.entities) {
    return state.bladeTypes.entities.find((b) => b.id === id)
  }
}

export default bladeTypesReducer
