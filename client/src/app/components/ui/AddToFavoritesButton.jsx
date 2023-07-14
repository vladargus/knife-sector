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

    currentUser.liked
      ? dispatch(
          updateUser(
            currentUser.liked && currentUser.liked[knife.id]
              ? {
                  ...currentUser,
                  liked: {
                    ...currentUser.liked,
                    [knife.id]: null
                  }
                }
              : {
                  ...currentUser,
                  liked: {
                    ...currentUser.liked,
                    [knife.id]: true
                  }
                }
          )
        )
      : dispatch(
          updateUser({
            ...currentUser,
            liked: {
              [knife.id]: true
            }
          })
        )
  }

  return (
    <button className='knife-button ms-3 px-3' onClick={handleHeartClick}>
      {currentUser && currentUser.liked && currentUser.liked[knife.id] ? (
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
