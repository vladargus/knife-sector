import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands, getBrandsLoadingStatus } from '../../store/brands'
import { getColors, getColorsLoadingStatus } from '../../store/colors'
import { getCountries, getCountriesLoadingStatus } from '../../store/countries'
import {
  getBladeTypes,
  getBladeTypesLoadingStatus
} from '../../store/bladeTypes'
import { getLockTypes, getLockTypesLoadingStatus } from '../../store/lockTypes'
import Loader from '../common/Loader'
import { validator } from '../../utils/validator'
import TextField from '../common/TextField'
import TextArea from '../common/TextArea'
import SelectField from '../common/SelectField'

const AdminKnifeEditForm = ({ initialData, onSubmit }) => {
  const [data, setData] = useState(initialData)
  const brands = useSelector(getBrands())
  const countries = useSelector(getCountries())
  const colors = useSelector(getColors())
  const bladeTypes = useSelector(getBladeTypes())
  const lockTypes = useSelector(getLockTypes())
  const brandsLoading = useSelector(getBrandsLoadingStatus())
  const countriesLoading = useSelector(getCountriesLoadingStatus())
  const colorsLoading = useSelector(getColorsLoadingStatus())
  const bladeTypesLoading = useSelector(getBladeTypesLoadingStatus())
  const lockTypesLoading = useSelector(getLockTypesLoadingStatus())
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validatorConfig = {
    brand: {
      isRequired: { message: 'Введите бренд' }
    },
    model: {
      isRequired: { message: 'Введите модель' }
    },
    price: {
      isRequired: { message: 'Введите цену' }
    },
    image: {
      isRequired: { message: 'Введите ссылку на фото' }
    },
    overallLength: {
      isRequired: { message: 'Введите длину ножа' }
    },
    bladeLength: {
      isRequired: { message: 'Введите длину клинка' }
    },
    bladeThickness: {
      isRequired: { message: 'Введите толщину клинка' }
    },
    bladeType: {
      isRequired: { message: 'Введите тип клинка' }
    },
    lockType: {
      isRequired: { message: 'Введите тип замка' }
    },
    bladeMaterial: {
      isRequired: { message: 'Введите материал клинка' }
    },
    hardness: {
      isRequired: { message: 'Введите твердость стали' }
    },
    handleMaterial: {
      isRequired: { message: 'Введите материал рукояти' }
    },
    color: {
      isRequired: { message: 'Введите цвет' }
    },
    country: {
      isRequired: { message: 'Введите страну' }
    },
    weight: {
      isRequired: { message: 'Введите вес' }
    },
    info: {
      isRequired: { message: 'Введите информацию о ноже' }
    },
    steelInfo: {
      isRequired: { message: 'Введите информацию о клинке' }
    },
    handleInfo: {
      isRequired: { message: 'Введите информацию о рукояти' }
    },
    link: {
      isRequired: { message: 'Введите ссылку на страницу в реальном магазине' }
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
    dispatch(onSubmit(data))
    navigate(`/admin`)
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

  if (
    !brandsLoading &&
    !countriesLoading &&
    !colorsLoading &&
    !bladeTypesLoading &&
    !lockTypesLoading
  ) {
    return (
      <form className='form' onSubmit={handleSubmit}>
        <SelectField
          label='Бренд'
          name='brand'
          value={data.brand}
          defaultOption='Выберите бренд'
          options={brands}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.brand}
        />
        <TextField
          label='Модель'
          name='model'
          value={data.model}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.model}
        />
        <TextField
          label='Цена, ₽'
          name='price'
          value={data.price}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.price}
        />
        <TextField
          label='Фото (url)'
          name='image'
          value={data.image}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.image}
        />
        <TextField
          label='Длина ножа, мм'
          name='overallLength'
          value={data.overallLength}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.overallLength}
        />
        <TextField
          label='Длина клинка, мм'
          name='bladeLength'
          value={data.bladeLength}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.bladeLength}
        />
        <TextField
          label='Толщина клинка, мм'
          name='bladeThickness'
          value={data.bladeThickness}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.bladeThickness}
        />
        <SelectField
          label='Тип клинка'
          name='bladeType'
          value={data.bladeType}
          defaultOption='Выберите тип клинка'
          options={bladeTypes}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.bladeType}
        />
        <SelectField
          label='Тип замка'
          name='lockType'
          value={data.lockType}
          defaultOption='Выберите тип замка'
          options={lockTypes}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.lockType}
        />
        <TextField
          label='Материал клинка'
          name='bladeMaterial'
          value={data.bladeMaterial}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.bladeMaterial}
        />
        <TextField
          label='Твердость стали, HRC'
          name='hardness'
          value={data.hardness}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.hardness}
        />
        <TextField
          label='Материал рукояти'
          name='handleMaterial'
          value={data.handleMaterial}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.handleMaterial}
        />
        <SelectField
          label='Цвет'
          name='color'
          value={data.color}
          defaultOption='Выберите цвет'
          options={colors}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.color}
        />
        <SelectField
          label='Страна'
          name='country'
          value={data.country}
          defaultOption='Выберите страну'
          options={countries}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.country}
        />
        <TextField
          label='Вес, гр'
          name='weight'
          value={data.weight}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.weight}
        />
        <TextArea
          label='Информация о ноже'
          name='info'
          value={data.info}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.info}
        />
        <TextArea
          label='Информация о клинке'
          name='steelInfo'
          value={data.steelInfo}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.steelInfo}
        />
        <TextArea
          label='Информация о рукояти'
          name='handleInfo'
          value={data.handleInfo}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.handleInfo}
        />
        <TextField
          label='Ссылка на страницу в реальном магазине (url)'
          name='link'
          value={data.link}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          error={errors.link}
        />
        <div className='mt-3 d-flex justify-content-center align-items-center'>
          <button
            className='knife-button me-4'
            type='submit'
            disabled={!isValid}
          >
            Сохранить
          </button>
          <Link to={`/admin`}>
            <button className='knife-button'>Отмена</button>
          </Link>
        </div>
      </form>
    )
  } else {
    return <Loader />
  }
}
AdminKnifeEditForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func
}

export default AdminKnifeEditForm
