import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserData, updateUser } from '../../store/users'

const AddToFavoritesButton = ({ knife }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUserData())

  const handleHeartClick = () => {
    if (!currentUser) {
      navigate('/auth/login', { state: { referrer: location } })
      return
    }

    if (currentUser.favorites) {
      const { [knife._id]: removedProperty, ...favoritesWithoutKnife } =
        currentUser.favorites

      dispatch(
        updateUser(
          currentUser.favorites && currentUser.favorites[knife._id]
            ? {
                ...currentUser,
                favorites: favoritesWithoutKnife
              }
            : {
                ...currentUser,
                favorites: {
                  ...currentUser.favorites,
                  [knife._id]: true
                }
              }
        )
      )
    } else {
      dispatch(
        updateUser({
          ...currentUser,
          favorites: {
            [knife._id]: true
          }
        })
      )
    }
  }

  return (
    <button className='knife-button ms-3 px-3' onClick={handleHeartClick}>
      {currentUser &&
      currentUser.favorites &&
      currentUser.favorites[knife._id] ? (
        <i className='bi bi-heart-fill'></i>
      ) : (
        <i className='bi bi-heart'></i>
      )}
    </button>
  )
}
AddToFavoritesButton.propTypes = {
  knife: PropTypes.object
}

export default AddToFavoritesButton
