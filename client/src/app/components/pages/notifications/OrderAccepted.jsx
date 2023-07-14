import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const OrderAccepted = () => {
  const location = useLocation()
  const id = location.state ? location.state.id : ''

  return (
    <div className='flex-center-column notification'>
      <p className='notification-text'>Спасибо!</p>
      <p className='notification-text'>
        Ваш заказ успешно оформлен. Мы свяжемся с Вами в ближайшее время.
      </p>
      <p className='notification-text'>Номер Вашего заказа: №{id}</p>

      <Link className='knife-button link-button' to='/'>
        Вернуться на главную
      </Link>
    </div>
  )
}

export default OrderAccepted
