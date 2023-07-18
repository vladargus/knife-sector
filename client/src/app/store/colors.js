import { createSlice } from '@reduxjs/toolkit'
import colorService from '../services/color.service'

const colorsSlice = createSlice({
  name: 'colors',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    colorsRequested: (state) => {
      state.isLoading = true
    },
    colorsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    colorsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: colorsReducer, actions } = colorsSlice
const { colorsRequested, colorsReceived, colorsRequestFailed } = actions

export const loadColorsList = () => async (dispatch) => {
  dispatch(colorsRequested())
  try {
    const { content } = await colorService.get()
    dispatch(colorsReceived(content))
  } catch (error) {
    dispatch(colorsRequestFailed(error.message))
  }
}

export const getColors = () => (state) => state.colors.entities
export const getColorsLoadingStatus = () => (state) => state.colors.isLoading
export const getColorById = (id) => (state) => {
  if (state.colors.entities) {
    return state.colors.entities.find((c) => c._id === id)
  }
}

export default colorsReducer
