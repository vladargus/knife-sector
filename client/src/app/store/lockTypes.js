import { createSlice } from '@reduxjs/toolkit'
import lockTypeService from '../services/lockType.service'

const lockTypesSlice = createSlice({
  name: 'lockTypes',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    lockTypesRequested: (state) => {
      state.isLoading = true
    },
    lockTypesReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    lockTypesRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: lockTypesReducer, actions } = lockTypesSlice
const { lockTypesRequested, lockTypesReceived, lockTypesRequestFailed } =
  actions

export const loadLockTypesList = () => async (dispatch) => {
  dispatch(lockTypesRequested())
  try {
    const { content } = await lockTypeService.get()
    dispatch(lockTypesReceived(content))
  } catch (error) {
    dispatch(lockTypesRequestFailed(error.message))
  }
}

export const getLockTypes = () => (state) => state.lockTypes.entities
export const getLockTypesLoadingStatus = () => (state) =>
  state.lockTypes.isLoading

export default lockTypesReducer
