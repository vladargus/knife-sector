import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../common/Loader'
import { validator } from '../../../utils/validator'
import TextField from '../../common/TextField'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrentUserData,
  updateEmail,
  updateUser
} from '../../../store/users'

const EditUserPage = () => {
  const currentUser = useSelector(getCurrentUserData())
  const dispatch = useDispatch()
  const [user, setUser] = useState(currentUser)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (target) => {
    setUser((prevState) => ({ ...prevState, [target.name]: target.value }))
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
    }
  }

  const singleValidate = (fieldName) => {
    const newErrors = validator(user, validatorConfig, fieldName)
    if (Object.keys(newErrors).length === 0) {
      const clearErrors = errors
      delete clearErrors[fieldName]
      setErrors(clearErrors)
    }
    setErrors((prevState) => ({ ...prevState, ...newErrors }))
  }

  useEffect(() => {
    for (const fieldName in user) {
      if (user[fieldName] !== '') {
        singleValidate(fieldName)
      }
    }
  }, [user])

  const handleBlur = ({ target }) => {
    singleValidate(target.name)
  }

  const validate = () => {
    const errors = validator(user, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    try {
      if (user.email !== currentUser.email) {
        dispatch(updateEmail(user.email))
      }
      dispatch(updateUser(user))
      navigate(`/user/${currentUser.id}/profile`)
    } catch (error) {
      setErrors(error)
    }
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

  if (user) {
    return (
      <div className='flex-center-column profile-container'>
        <h3 className='profile-title'>Редактирование профиля</h3>
        <form className='form' onSubmit={handleSubmit}>
          <TextField
            label='Имя'
            name='name'
            value={user.name}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={errors.name}
          />
          <TextField
            label='Фамилия'
            name='surname'
            value={user.surname}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={errors.surname}
          />
          <TextField
            label='Телефон'
            name='phone'
            value={user.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={errors.phone}
          />
          <TextField
            label='Электронная почта'
            name='email'
            value={user.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={errors.email}
          />
          <div className='mt-3 d-flex justify-content-center align-items-center'>
            <button
              className='knife-button me-4'
              type='submit'
              disabled={!isValid}
            >
              Сохранить
            </button>
            <Link
              className='knife-button link-button'
              to={`/user/${currentUser.id}/profile`}
            >
              Отмена
            </Link>
          </div>
        </form>
      </div>
    )
  } else {
    return <Loader />
  }
}

export default EditUserPage
