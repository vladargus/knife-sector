import React, { useEffect, useState } from 'react'
import TextField from '../common/TextField'
import { validator } from '../../utils/validator'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, getAuthErrors, signUp } from '../../store/users'

const RegisterForm = () => {
  const [data, setData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: ''
  })
  const signupError = useSelector(getAuthErrors())
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    setErrors({ email: signupError })
  }, [signupError])

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validatorConfig = {
    name: {
      isRequired: { message: 'Введите имя' },
      isName: {
        message: 'Имя введено некорректно'
      }
    },
    surname: {
      isRequired: { message: 'Введите фамилию' },
      isSurname: {
        message: 'Фамилия введена некорректно'
      }
    },
    phone: {
      isRequired: { message: 'Введите телефон' },
      isPhone: {
        message: 'Телефон введен некорректно'
      }
    },
    email: {
      isRequired: { message: 'Введите e-mail' },
      isEmail: {
        message: 'Email введен некорректно'
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

  const normalizeEmail = (email) => {
    if (email.split('@')[1].includes('gmail')) {
      return email.split('@')[0].replaceAll('.', '') + '@' + email.split('@')[1]
    }
    return email
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    dispatch(signUp({ ...data, email: normalizeEmail(data.email) }))
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
    <form className='form' onSubmit={handleSubmit}>
      <TextField
        label='Имя'
        name='name'
        value={data.name}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        error={errors.name}
      />
      <TextField
        label='Фамилия'
        name='surname'
        value={data.surname}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        error={errors.surname}
      />
      <TextField
        label='Телефон'
        name='phone'
        value={data.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        error={errors.phone}
      />
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
      <button
        className='knife-button login-button'
        type='submit'
        disabled={!isValid}
      >
        Зарегистрироваться
      </button>
    </form>
  )
}

export default RegisterForm
