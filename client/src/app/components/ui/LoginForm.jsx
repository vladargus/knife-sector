import React, { useEffect, useState } from 'react'
import TextField from '../common/TextField'
import { validator } from '../../utils/validator'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, getAuthErrors, logIn } from '../../store/users'

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const loginError = useSelector(getAuthErrors())
  const [enterError, setEnterError] = useState(null)
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    setEnterError(loginError)
  }, [loginError])

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
    setEnterError(null)
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Введите e-mail' },
      isEmail: {
        message: 'E-mail введен некорректно'
      }
    },
    password: {
      isRequired: { message: 'Введите пароль' },
      isLatin: { message: 'Пароль должен содержать только латинские буквы' },
      noSpaces: { message: 'Пароль не должен содержать пробелы' },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одну цифру'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    }
  }

  const singleValidate = (fieldName) => {
    const newErrors = validator(data, validatorConfig, fieldName)
    if (Object.keys(newErrors).length === 0) {
      const clearErrors = errors
      delete clearErrors[fieldName]
      setErrors(clearErrors)
    }
    setErrors((prevState) => ({ ...prevState, ...newErrors }))
  }

  useEffect(() => {
    for (const fieldName in data) {
      if (data[fieldName] !== '') {
        singleValidate(fieldName)
      }
    }
  }, [data])

  const handleBlur = ({ target }) => {
    singleValidate(target.name)
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const redirect = location.state ? location.state.referrer.pathname : '/'
    dispatch(logIn({ payload: data, redirect }))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const form = e.target.form
      const indexField = Array.prototype.indexOf.call(form, e.target) + 1
      const formElements = [...form.elements].filter(
        (el) => el.localName !== 'button'
      )
      if (indexField !== formElements.length) {
        formElements[indexField].focus()
      } else {
        handleSubmit(e)
      }
    }
  }

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <TextField
          label='Электронная почта'
          name='email'
          value={data.email}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.email}
        />
        <TextField
          label='Пароль'
          type='password'
          name='password'
          value={data.password}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.password}
        />
        {enterError && <p className='text-danger'>{enterError}</p>}
        <button
          className='knife-button login-button'
          type='submit'
          disabled={!isValid || enterError}
        >
          Войти
        </button>
      </form>
    </>
  )
}

export default LoginForm
