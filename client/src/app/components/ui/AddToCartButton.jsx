import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserId } from '../../store/users'
import { getUserCart, createUserCart, updateUserCart } from '../../store/cart'

const AddToCartButton = ({ knife, label }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const currentUserId = useSelector(getCurrentUserId())
  const userCart = useSelector(getUserCart(currentUserId))

  const handleCartClick = () => {
    if (!currentUserId) {
      navigate('/auth/login', { state: { referrer: location } })
      return
    }

    if (!userCart) {
      dispatch(
        createUserCart(currentUserId, {
          [knife.id]: { id: knife.id, quantity: 1 }
        })
      )
    } else {
      dispatch(
        updateUserCart({
          ...userCart,
          items: userCart.items
            ? {
                ...userCart.items,
                [knife.id]: userCart.items[knife.id]
                  ? {
                      id: knife.id,
                      quantity: userCart.items[knife.id].quantity + 1
                    }
                  : { id: knife.id, quantity: 1 }
              }
            : { [knife.id]: { id: knife.id, quantity: 1 } }
        })
      )
    }
  }

  return (
    <button className='knife-button' onClick={handleCartClick}>
      {label}
      {userCart && userCart.items && userCart.items[knife.id] ? (
        <i className='bi bi-cart-check-fill ms-2'></i>
      ) : (
        <i className='bi bi-cart ms-2'></i>
      )}
    </button>
  )
}
AddToCartButton.defaultProps = {
  label: 'В корзину'
}
AddToCartButton.propTypes = {
  knife: PropTypes.object,
  label: PropTypes.string
}

export default AddToCartButton
