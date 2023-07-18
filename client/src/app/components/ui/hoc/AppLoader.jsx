/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList
} from '../../../store/users'
import { getKnivesLoadingStatus, loadKnivesList } from '../../../store/knives'
import { loadBrandsList } from '../../../store/brands'
import { loadColorsList } from '../../../store/colors'
import { loadCountriesList } from '../../../store/countries'
import { loadBladeTypesList } from '../../../store/bladeTypes'
import { loadLockTypesList } from '../../../store/lockTypes'
import Loader from '../../common/Loader'
import { loadCartList } from '../../../store/cart'
import { loadOrderList } from '../../../store/order'
import NavBar from '../NavBar'

const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const knivesLoadingStatus = useSelector(getKnivesLoadingStatus())
  const usersLoadingStatus = useSelector(getUsersLoadingStatus())

  useEffect(() => {
    dispatch(loadKnivesList())
    dispatch(loadBrandsList())
    dispatch(loadColorsList())
    dispatch(loadCountriesList())
    dispatch(loadBladeTypesList())
    dispatch(loadLockTypesList())
    if (isLoggedIn) {
      dispatch(loadUsersList())
      dispatch(loadCartList())
      dispatch(loadOrderList())
    }
  }, [isLoggedIn])

  if (knivesLoadingStatus || usersLoadingStatus) {
    return (
      <>
        <NavBar />
        <Loader />
      </>
    )
  }
  return children
}
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AppLoader
