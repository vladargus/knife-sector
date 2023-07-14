import { createAction, createSlice } from '@reduxjs/toolkit'
import orderService from '../services/order.service'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: false
  },
  reducers: {
    orderRequested: (state) => {
      state.isLoading = true
    },
    orderReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    orderRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    userOrderCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    userOrdersUpdated: (state, action) => {
      state.entities[
        state.entities.findIndex((user) => user.id === action.payload.id)
      ] = action.payload
    }
  }
})

const { reducer: orderReducer, actions } = orderSlice
const {
  orderRequested,
  orderReceived,
  orderRequestFailed,
  userOrderCreated,
  userOrdersUpdated
} = actions
const createUserOrderRequested = createAction('order/createUserOrderRequested')
const updateUserOrdersRequested = createAction(
  'order/updateUserOrdersRequested'
)

export const loadOrderList = () => async (dispatch) => {
  dispatch(orderRequested())
  try {
    const { content } = await orderService.get()
    dispatch(orderReceived(content))
  } catch (error) {
    dispatch(orderRequestFailed(error.message))
  }
}

export const createUserOrder = (payload) => async (dispatch) => {
  dispatch(createUserOrderRequested(payload))
  try {
    const { content } = await orderService.create(payload)
    dispatch(userOrderCreated(content))
  } catch (error) {
    dispatch(orderRequestFailed(error.message))
  }
}

export const updateUserOrders = (payload) => async (dispatch) => {
  dispatch(updateUserOrdersRequested())
  try {
    const { content } = await orderService.update(payload)
    dispatch(userOrdersUpdated(content))
  } catch (error) {
    dispatch(orderRequestFailed(error.message))
  }
}

export const getUserOrders = (userId) => (state) => {
  if (state.order.entities) {
    return state.order.entities.find((o) => o.userId === userId)
  }
}

export const getUserOrderById = (userId, orderId) => (state) => {
  if (state.order.entities) {
    return state.order.entities.find((c) => c.userId === userId).orders[orderId]
  }
}

export const getUserOrdersLoadingStatus = () => (state) => state.order.isLoading

export default orderReducer
