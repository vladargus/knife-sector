import React from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../common/Loader'
import { useSelector } from 'react-redux'
import { getCurrentUserData } from '../../../store/users'

const UserPage = () => {
  const currentUser = useSelector(getCurrentUserData())

  if (currentUser) {
    return (
      <div className='flex-center-column profile-container'>
        <h3 className='profile-title'>Просмотр профиля</h3>
        <div className='profile-text'>
          <p className='my-4'>
            <span className='fw-semibold'>Имя: </span>
            {currentUser.name}
          </p>
          <p className='my-4'>
            <span className='fw-semibold'>Фамилия: </span>
            {currentUser.surname}
          </p>
          <p className='my-4'>
            <span className='fw-semibold'>Телефон: </span>
            {currentUser.phone}
          </p>
          <p className='my-4'>
            <span className='fw-semibold'>Электронная почта: </span>
            {currentUser.email}
          </p>
          <p className='my-4'>
            <span className='fw-semibold'>Группа: </span>
            {currentUser.isAdmin ? 'Администраторы' : 'Посетители'}
          </p>
        </div>
        <Link
          className='knife-button link-button'
          to={`/user/${currentUser.id}/edit`}
        >
          Редактировать профиль
        </Link>
      </div>
    )
  } else {
    return <Loader />
  }
}

export default UserPage
