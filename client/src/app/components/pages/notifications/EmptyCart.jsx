import React from 'react'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className='flex-center-column notification'>
      <p className='notification-text'>Ваша корзина пуста.</p>
      <Link className='knife-button link-button' to='/'>
        Вернуться на главную
      </Link>
    </div>
  )
}

export default EmptyCart
