import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Price from '../../common/Price'
import { getKnives } from '../../../store/knives'
import {
  getUserOrderById,
  getUserOrdersLoadingStatus
} from '../../../store/order'
import { getCurrentUserId } from '../../../store/users'
import Loader from '../../common/Loader'
import { displayDate } from '../../../utils/displayDate'

const UserOrderDetailPage = () => {
  const params = useParams()
  const { orderId } = params
  const currentUserId = useSelector(getCurrentUserId())
  const userOrdersLoadingStatus = useSelector(getUserOrdersLoadingStatus())
  const order = useSelector(getUserOrderById(currentUserId, orderId))
  const knives = useSelector(getKnives())

  if (userOrdersLoadingStatus) return <Loader />

  const deliveryTypes = [
    { name: 'Самовывоз из магазина (бесплатно)', _id: 1, cost: 0 },
    { name: 'Почта России (400 руб.)', _id: 2, cost: 400 },
    { name: 'Курьерская служба СДЭК (800 руб.)', _id: 3, cost: 800 }
  ]

  const getDeliveryTypeCost = (name) => {
    const deliveryType = deliveryTypes.find((dt) => dt.name === name)

    if (deliveryType) return deliveryType.cost
  }

  const filteredKnives = knives.filter((knife) =>
    Object.keys(order.items).includes(knife._id)
  )

  const total =
    filteredKnives.reduce((acc, knife) => {
      return acc + knife.price * order.items[knife._id].quantity
    }, 0) + (order.deliveryType ? getDeliveryTypeCost(order.deliveryType) : 0)

  return (
    <div className='flex-center-column profile-container'>
      <p className='fw-semibold'>
        Ваш заказ №{order.orderId.replace('order', '')}:
      </p>
      <ul className='order-list w-50'>
        {filteredKnives.length
          ? filteredKnives.map((knife) => (
              <li key={knife._id}>
                <div className='d-flex w-100 justify-content-between'>
                  <span>Нож {knife.brand + ' ' + knife.model}</span>
                  <span>
                    <Price price={knife.price} />
                    {' x ' + order.items[knife._id].quantity}
                  </span>
                </div>
                <hr />
              </li>
            ))
          : 'Loading...'}
        {order.deliveryType !== '0' && (
          <li>
            <div className='d-flex w-100 justify-content-between'>
              <span>Доставка</span>
              <span>
                <Price
                  price={
                    order.deliveryType
                      ? getDeliveryTypeCost(order.deliveryType)
                      : 0
                  }
                />
              </span>
            </div>
            <hr />
          </li>
        )}
      </ul>
      <p className='cart-total w-50 d-flex justify-content-end'>
        Итого:&nbsp;
        <span className='fw-semibold'>
          <Price price={total} />
        </span>
      </p>

      <p className='fw-semibold mt-4'>Детали и информация по заказу:</p>
      <div className='order-info w-50'>
        <p>Дата заказа: {displayDate(order.created_at)}</p>
        <p>Имя: {order.fullname}</p>
        <p>E-mail: {order.email}</p>
        <p>Телефон: {order.phone}</p>
        {order.address && <p>Адрес доставки: {order.address}</p>}
        <p>Способ доставки: {order.deliveryType}</p>
        {order.comment && <p>Примечание: {order.comment}</p>}
      </div>

      <Link
        className='knife-button link-button'
        to={`/user/${currentUserId}/orders`}
      >
        Вернуться к заказам
      </Link>
    </div>
  )
}

export default UserOrderDetailPage
