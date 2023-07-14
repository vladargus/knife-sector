import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loader from '../common/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getBrandById, getBrandsLoadingStatus } from '../../store/brands'
import { getUserCart, removeItem, updateUserCart } from '../../store/cart'
import { getCurrentUserId } from '../../store/users'
import Price from '../common/Price'

const CartKnifeItem = ({ knife }) => {
  const dispatch = useDispatch()
  const brand = useSelector(getBrandById(knife.brand))
  const brandsLoading = useSelector(getBrandsLoadingStatus())
  const currentUserId = useSelector(getCurrentUserId())
  const userCart = useSelector(getUserCart(currentUserId))
  const count = userCart.items[knife.id].quantity

  if (brandsLoading) return <Loader />

  const handleRemoveItem = () => {
    dispatch(removeItem(userCart.id, knife.id))
  }

  const handleDecrease = () => {
    dispatch(
      updateUserCart({
        ...userCart,
        items: {
          ...userCart.items,
          [knife.id]: { id: knife.id, quantity: count > 1 ? count - 1 : count }
        }
      })
    )
  }
  const handleIncrease = () => {
    dispatch(
      updateUserCart({
        ...userCart,
        items: {
          ...userCart.items,
          [knife.id]: { id: knife.id, quantity: count + 1 }
        }
      })
    )
  }

  return (
    <div className='cart-knife-item'>
      <div className='d-flex align-items-center'>
        <Link
          className='flex-center-column cart-image-link'
          to={`/knives/${knife.id}`}
        >
          <img className='cart-knife-image' src={knife.image} alt='' />
        </Link>
        <Link className='cart-knife-title ms-3' to={`/knives/${knife.id}`}>
          <span className='cart-knife-title my-2'>
            Нож {brand.name + ' ' + knife.model}
          </span>
        </Link>
      </div>
      <div className='d-flex align-items-center'>
        <div>
          <span className='me-5'>
            <Price price={knife.price * count} />
          </span>
          <button className='cart-knife-button me-3' onClick={handleDecrease}>
            <i className='bi bi-dash-circle'></i>
          </button>
          <span className='fw-semibold'>
            {userCart.items[knife.id].quantity}
          </span>
          <button className='cart-knife-button ms-3' onClick={handleIncrease}>
            <i className='bi bi-plus-circle'></i>
          </button>
        </div>
        <button className='cart-knife-button ms-5' onClick={handleRemoveItem}>
          <i className='bi bi-trash3'></i>
        </button>
      </div>
    </div>
  )
}

CartKnifeItem.propTypes = {
  knife: PropTypes.object
}

export default CartKnifeItem
