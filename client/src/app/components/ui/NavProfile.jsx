import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUserData } from '../../store/users'

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData())
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.className.includes('dropdown-toggle')) {
      e.preventDefault()
      setOpen((prevState) => !prevState)
    }
  }
  const handleToggle = () => {
    setOpen(!isOpen)
  }

  if (!currentUser) {
    return (
      <div className='btn navlink-item dropdown-toggle d-flex align-items-center p-0'>
        <i className='bi bi-person me-1'></i>Loading...
      </div>
    )
  }

  return (
    <div
      className='dropdown'
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onClick={handleToggle}
    >
      <button
        className='btn navlink-item dropdown-toggle d-flex align-items-center p-0'
        onClick={handleClose}
        onKeyDown={handleKeyDown}
      >
        <i className='bi bi-person me-1'></i>
        <div className='me-1'>{currentUser.name}</div>
      </button>
      <div
        className={
          'dropdown-menu dropdown-menu-end p-0' + (isOpen ? ' show' : '')
        }
      >
        <Link className='dropdown-item' to={`/user/${currentUser._id}/profile`}>
          <i className='bi bi-person-gear me-3'></i>Мой профиль
        </Link>
        <Link className='dropdown-item' to={`/user/${currentUser._id}/orders`}>
          <i className='bi bi-list-ul me-3'></i>Мои заказы
        </Link>
        <Link
          className='dropdown-item'
          to={`/user/${currentUser._id}/favorites`}
        >
          <i className='bi bi-heart me-3'></i>Избранное
        </Link>
        {currentUser.isAdmin && (
          <Link className='dropdown-item' to='/admin'>
            <i className='bi bi-columns-gap me-3'></i>Админ-панель
          </Link>
        )}
        <hr className='dropdown-divider my-0'></hr>
        <Link to='/logout' className='dropdown-item'>
          <i className='bi bi-box-arrow-right me-3'></i>Выйти
        </Link>
      </div>
    </div>
  )
}

export default NavProfile
