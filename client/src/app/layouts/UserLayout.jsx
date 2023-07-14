import React from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'

const UserLayout = () => {
  const params = useParams()
  const { userId } = params
  const location = useLocation()
  const currentUserId = useSelector(getCurrentUserId())

  if (userId !== currentUserId) {
    const pathArray = location.pathname.split('/')
    const type = pathArray[pathArray.length - 1]
    return <Navigate to={`/user/${currentUserId}/${type}`} />
  }

  return <Outlet />
}

export default UserLayout
