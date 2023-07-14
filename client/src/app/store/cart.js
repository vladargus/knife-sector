import { createAction, createSlice } from '@reduxjs/toolkit'
import cartService from '../services/cart.service'
import { getNewId } from '../utils/getNewId'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: false
  },
  reducers: {
    cartRequested: (state) => {
      state.isLoading = true
    },
    cartReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    cartRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    userCartCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    userCartUpdated: (state, action) => {
      state.entities[
        state.entities.findIndex((user) => user.id === action.payload.id)
      ] = action.payload
    },
    itemRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item.id !== action.payload
      )
    }
  }
})

const { reducer: cartReducer, actions } = cartSlice
const {
  cartRequested,
  cartReceived,
  cartRequestFailed,
  userCartCreated,
  userCartUpdated,
  itemRemoved
} = actions
const createUserCartRequested = createAction('cart/createUserCartRequested')
const updateUserCartRequested = createAction('cart/updateUserCartRequested')
const removeItemRequested = createAction('cart/removeItemRequested')

export const loadCartList = () => async (dispatch) => {
  dispatch(cartRequested())
  try {
    const { content } = await cartService.get()
    dispatch(cartReceived(content))
  } catch (error) {
    dispatch(cartRequestFailed(error.message))
  }
}

export const createUserCart = (userId, payload) => async (dispatch) => {
  dispatch(createUserCartRequested(payload))
  const userCart = {
    id: getNewId('cart'),
    userId,
    items: payload
  }
  try {
    const { content } = await cartService.create(userCart)
    dispatch(userCartCreated(content))
  } catch (error) {
    dispatch(cartRequestFailed(error.message))
  }
}

export const updateUserCart = (payload) => async (dispatch) => {
  dispatch(updateUserCartRequested())
  try {
    const { content } = await cartService.update(payload)
    dispatch(userCartUpdated(content))
  } catch (error) {
    dispatch(cartRequestFailed(error.message))
  }
}

export const removeItem = (cartId, itemId) => async (dispatch) => {
  dispatch(removeItemRequested())
  try {
    const { content } = await cartService.remove(cartId, itemId)
    if (content === null) {
      dispatch(itemRemoved(itemId))
    }
  } catch (error) {
    dispatch(cartRequestFailed(error.message))
  }
}

export const getUserCart = (userId) => (state) => {
  if (state.cart.entities) {
    return state.cart.entities.find((c) => c.userId === userId)
  }
}
export const getUserCartLoadingStatus = () => (state) => state.cart.isLoading

export default cartReducer
