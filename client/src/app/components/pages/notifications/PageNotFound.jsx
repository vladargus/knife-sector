import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='flex-center-column notification'>
      <p className='notification-text'>Страница не найдена</p>
      <Link className='knife-button link-button' to='/'>
        Вернуться на главную
      </Link>
    </div>
  )
}

export default PageNotFound
