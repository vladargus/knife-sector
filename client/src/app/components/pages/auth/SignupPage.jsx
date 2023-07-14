import React from 'react'
import RegisterForm from '../../ui/RegisterForm'
import { Link } from 'react-router-dom'

const SignupPage = () => {
  return (
    <>
      <h1 className='knife-detail-title'>Регистрация</h1>
      <p className='login-text mt-3'>Введите свои данные...</p>
      <RegisterForm />
      <p className='login-text'>
        Уже регистрировались?{' '}
        <Link className='login-text-link' to='../login'>
          Войти
        </Link>
      </p>
    </>
  )
}

export default SignupPage
