import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../../ui/LoginForm'

const LoginPage = () => {
  return (
    <>
      <h1 className='knife-detail-title'>Авторизация</h1>
      <p className='login-text mt-3'>Пожалуйста, авторизуйтесь...</p>
      <LoginForm />
      <p className='login-text'>
        Впервые у нас?{' '}
        <Link className='login-text-link' to='../signup'>
          Зарегистрироваться
        </Link>
      </p>
    </>
  )
}

export default LoginPage
