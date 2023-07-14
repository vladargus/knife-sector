import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/users'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/common/Loader'

const LogOut = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logOut())
    navigate('/')
  }, [])

  return <Loader />
}

export default LogOut
