import React from 'react'
import { Link } from 'react-router-dom'

const EmptyFavorites = () => {
  return (
    <div className='flex-center-column notification'>
      <p className='notification-text'>Список избранных пуст.</p>
      <Link className='knife-button link-button' to='/'>
        Вернуться на главную
      </Link>
    </div>
  )
}

export default EmptyFavorites
