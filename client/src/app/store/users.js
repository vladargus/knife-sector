import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import { generateAuthError } from '../utils/generateAuthError'

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false
    }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccessed: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    signUpRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = []
      }
      state.entities.push(action.payload)
    },
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((user) => user._id === action.payload._id)
      ] = action.payload
    },
    authRequested: (state) => {
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

const { reducer: usersReducer, actions } = usersSlice
export const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccessed,
  authRequestFailed,
  signUpRequestFailed,
  userLoggedOut,
  userUpdateSuccessed,
  clearError
} = actions

const authRequested = createAction('users/authRequested')
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

export const logIn =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
      const data = await authService.login({ email, password })
      localStorageService.setTokens(data)
      dispatch(authRequestSuccessed({ userId: data.userId }))
      history.navigate(redirect)
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        const errorMessage = generateAuthError(message)
        dispatch(authRequestFailed(errorMessage))
      } else {
        dispatch(authRequestFailed(error.message))
      }
    }
  }

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested())
  try {
    const data = await authService.register(payload)
    localStorageService.setTokens(data)
    history.navigate('/')
    dispatch(authRequestSuccessed({ userId: data.userId }))
  } catch (error) {
    const { code, message } = error.response.data.error
    if (code === 400) {
      const errorMessage = generateAuthError(message)
      dispatch(signUpRequestFailed(errorMessage))
    } else {
      dispatch(signUpRequestFailed(error.message))
    }
  }
}

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
}

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested())
  try {
    const { content } = await userService.update(payload)
    dispatch(userUpdateSuccessed(content))
  } catch (error) {
    dispatch(userUpdateFailed(error.message))
  }
}

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const { content } = await userService.get()
    dispatch(usersReceived(content))
  } catch (error) {
    dispatch(usersRequestFailed(error.message))
  }
}

export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null
}

export const getUsersLoadingStatus = () => (state) => state.users.isLoading

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn

export const getCurrentUserId = () => (state) => {
  return state.users.auth ? state.users.auth.userId : null
}

export const getAuthErrors = () => (state) => state.users.error

export default usersReducer
