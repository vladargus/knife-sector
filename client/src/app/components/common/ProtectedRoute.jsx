import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getCurrentUserData, getIsLoggedIn } from '../../store/users'

const ProtectedRoute = ({ redirectTo, element, adminRoute }) => {
  const location = useLocation()
  const currentUser = useSelector(getCurrentUserData())
  const isLoggedIn = useSelector(getIsLoggedIn())

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} state={{ referrer: location }} />
  }

  if (adminRoute && !currentUser.isAdmin) {
    return <Navigate to={`/page-not-found`} />
  }

  return element
}

ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string,
  element: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  adminRoute: PropTypes.bool
}

export default ProtectedRoute
