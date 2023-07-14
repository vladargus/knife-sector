import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../common/Loader'
import { getCurrentUserId } from '../../../store/users'
import { getUserOrders, getUserOrdersLoadingStatus } from '../../../store/order'
import { displayDate } from '../../../utils/displayDate'
import EmptyOrders from '../notifications/EmptyOrders'

const UserOrdersPage = () => {
  const currentUserId = useSelector(getCurrentUserId())
  const userOrders = useSelector(getUserOrders(currentUserId))
  const userOrdersLoadingStatus = useSelector(getUserOrdersLoadingStatus())
  const userOrdersArray =
    userOrders && userOrders.orders
      ? Object.values(userOrders.orders).sort(
          (a, b) => a.created_at - b.created_at
        )
      : []

  if (userOrdersLoadingStatus && !userOrders) return <Loader />

  if (!userOrdersArray.length) return <EmptyOrders />

  if (currentUserId) {
    return (
      <div className='flex-center-column profile-container'>
        <h3 className='profile-title'>Ваши заказы</h3>
        <div className='profile-text'>
          {userOrdersArray.map((order) => (
            <p key={order.orderId} className='my-4'>
              {displayDate(order.created_at)}
              {' / '}
              <Link
                className='text-link'
                to={`/user/${currentUserId}/orders/${order.orderId}`}
              >
                <span className='fw-semibold'>
                  Заказ №{order.orderId.replace('order', '')}
                </span>
              </Link>
              {' / '}
              принят
            </p>
          ))}
        </div>
      </div>
    )
  } else {
    return <Loader />
  }
}

export default UserOrdersPage
