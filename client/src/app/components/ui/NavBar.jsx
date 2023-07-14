import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavProfile from './NavProfile'
import { useSelector } from 'react-redux'
import { getCurrentUserId, getIsLoggedIn } from '../../store/users'
import { getUserCart } from '../../store/cart'
import useTheme from '../../hooks/useTheme'

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn())
  const location = useLocation()
  const currentUserId = useSelector(getCurrentUserId())
  const userCart = useSelector(getUserCart(currentUserId))
  const count = Object.values(
    userCart && userCart.items ? userCart.items : []
  ).reduce((acc, item) => {
    return acc + item.quantity
  }, 0)
  const { theme, setTheme } = useTheme()
  const [iconFill, setIconFill] = useState(false)

  const handleIconToggle = () => {
    setIconFill(!iconFill)
  }

  const handleThemeToggle = (e) => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <nav className='navbar-wrapper'>
      <Link className='navbar-logo' to='/'>
        <span className='navbar-logo-span'>Knife Sector</span>
      </Link>
      <div className='navlink-wrapper'>
        <Link className='navlink-item navlink-item-main' to='/'>
          Главная
        </Link>

        {isLoggedIn ? (
          <>
            <NavProfile />
            <Link className='navlink-item' to='/cart'>
              <i className={`bi bi-cart${count ? '-fill' : ''} me-2`}></i>
              Корзина ({count})
            </Link>
          </>
        ) : (
          <Link
            className='navlink-item'
            to='/auth/login'
            state={{ referrer: location }}
          >
            <i className='bi bi-box-arrow-in-right me-2'></i>Вход
          </Link>
        )}
        <button
          className='navlink-item navlink-item-theme-toggle'
          onMouseEnter={handleIconToggle}
          onMouseLeave={handleIconToggle}
          onClick={handleThemeToggle}
        >
          {theme === 'light' ? (
            <i className={`bi bi-moon${iconFill ? '-fill' : ''}`}></i>
          ) : (
            <i className={`bi bi-sun${iconFill ? '-fill' : ''}`}></i>
          )}
        </button>
      </div>
    </nav>
  )
}

export default NavBar
