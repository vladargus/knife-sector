import { createAction, createSlice } from '@reduxjs/toolkit'
import knifeService from '../services/knife.service'
import { shuffle } from '../utils/shuffle'

const knivesSlice = createSlice({
  name: 'knives',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    knivesRequested: (state) => {
      state.isLoading = true
    },
    knivesReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    knivesRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    knifeCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    knifeUpdated: (state, action) => {
      state.entities[
        state.entities.findIndex((knife) => knife._id === action.payload._id)
      ] = action.payload
    },
    knifeRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (knife) => knife._id !== action.payload
      )
    }
  }
})

const { reducer: knivesReducer, actions } = knivesSlice
const {
  knivesRequested,
  knivesReceived,
  knivesRequestFailed,
  knifeCreated,
  knifeUpdated,
  knifeRemoved
} = actions
const addKnifeRequested = createAction('knives/addKnifeRequested')
const updateKnifeRequested = createAction('knives/updateKnifeRequested')
const removeKnifeRequested = createAction('knives/removeKnifeRequested')

export const loadKnivesList = () => async (dispatch) => {
  dispatch(knivesRequested())
  try {
    const { content } = await knifeService.get()
    dispatch(knivesReceived(shuffle(content)))
  } catch (error) {
    dispatch(knivesRequestFailed(error.message))
  }
}

export const createKnife = (payload) => async (dispatch) => {
  dispatch(addKnifeRequested(payload))
  try {
    const { content } = await knifeService.create(payload)
    dispatch(knifeCreated(content))
  } catch (error) {
    dispatch(knivesRequestFailed(error.message))
  }
}

export const updateKnife = (payload) => async (dispatch) => {
  dispatch(updateKnifeRequested())
  try {
    const { content } = await knifeService.update(payload)
    dispatch(knifeUpdated(content))
  } catch (error) {
    dispatch(knivesRequestFailed(error.message))
  }
}

export const removeKnife = (knifeId) => async (dispatch) => {
  dispatch(removeKnifeRequested())
  try {
    const { content } = await knifeService.remove(knifeId)
    if (!content) {
      dispatch(knifeRemoved(knifeId))
    }
  } catch (error) {
    dispatch(knivesRequestFailed(error.message))
  }
}

export const getKnives = () => (state) => state.knives.entities
export const getKnivesLoadingStatus = () => (state) => state.knives.isLoading
export const getKnifeById = (id) => (state) => {
  if (state.knives.entities) {
    return state.knives.entities.find((k) => k._id === id)
  }
}

export default knivesReducer
