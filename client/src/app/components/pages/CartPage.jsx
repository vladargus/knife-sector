import React, { useEffect } from 'react'
import Loader from '../common/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getKnives } from '../../store/knives'
import {
  getUserCart,
  getUserCartLoadingStatus,
  loadCartList,
  updateUserCart
} from '../../store/cart'
import { getCurrentUserId } from '../../store/users'
import EmptyCart from './notifications/EmptyCart'
import CartKnifeItem from '../ui/CartKnifeItem'
import Price from '../common/Price'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const currentUserId = useSelector(getCurrentUserId())
  const userCart = useSelector(getUserCart(currentUserId))
  const userCartLoadingStatus = useSelector(getUserCartLoadingStatus())
  const knives = useSelector(getKnives())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCartList())
  }, [userCart])

  if (userCartLoadingStatus && !userCart) return <Loader />
  if (!userCart || !userCart.items) return <EmptyCart />

  const filteredKnives = knives.filter((knife) =>
    Object.keys(userCart.items).includes(knife.id)
  )

  const total = filteredKnives.reduce((acc, knife) => {
    return acc + knife.price * userCart.items[knife.id].quantity
  }, 0)

  const handleClearCart = () => {
    dispatch(
      updateUserCart({
        ...userCart,
        items: {}
      })
    )
  }

  return (
    <div className='cart-wrapper'>
      <h1 className='cart-title'>Корзина</h1>
      <div className='items-wrapper w-100'>
        {filteredKnives.length ? (
          filteredKnives.map((knife) => (
            <CartKnifeItem key={knife.id} knife={knife} />
          ))
        ) : (
          <Loader />
        )}
      </div>
      <p className='cart-total'>
        Итого:{' '}
        <span className='fw-semibold'>
          <Price price={total} />
        </span>
      </p>
      <Link className='knife-button link-button order-button' to='/order'>
        Оформить заказ
      </Link>
      <button className='clear-cart' onClick={handleClearCart}>
        Очистить корзину
      </button>
    </div>
  )
}

export default CartPage
