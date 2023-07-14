import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrentUserData,
  getCurrentUserId,
  getUsersLoadingStatus
} from '../../store/users'
import {
  getUserCart,
  getUserCartLoadingStatus,
  loadCartList,
  updateUserCart
} from '../../store/cart'
import { getKnives } from '../../store/knives'
import { Link, useNavigate } from 'react-router-dom'
import { getBrands, getBrandsLoadingStatus } from '../../store/brands'
import Price from '../common/Price'
import {
  createUserOrder,
  getUserOrders,
  updateUserOrders
} from '../../store/order'
import { validator } from '../../utils/validator'
import TextField from '../common/TextField'
import TextArea from '../common/TextArea'
import SelectField from '../common/SelectField'
import SingleCheckboxField from '../common/SingleCheckboxField'
import Loader from '../common/Loader'
import EmptyCart from './notifications/EmptyCart'
import { getNewId } from '../../utils/getNewId'

const OrderPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(getCurrentUserData())
  const userLoadingStatus = useSelector(getUsersLoadingStatus())
  const currentUserId = useSelector(getCurrentUserId())
  const userCart = useSelector(getUserCart(currentUserId))
  const userCartLoadingStatus = useSelector(getUserCartLoadingStatus())
  const userOrders = useSelector(getUserOrders(currentUserId))
  const knives = useSelector(getKnives())
  const brands = useSelector(getBrands())
  const brandsLoading = useSelector(getBrandsLoadingStatus())

  const [values, setValues] = useState({
    fullname: currentUser.name + ' ' + currentUser.surname,
    email: currentUser.email,
    phone: currentUser.phone,
    address: '',
    deliveryType: '',
    comment: '',
    agreement: true
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(loadCartList())
  }, [userCart])

  const validatorConfig = {
    fullname: {
      isRequired: { message: 'Введите имя' },
      isName: {
        message: 'Имя введено некорректно'
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
    deliveryType: {
      isRequired: { message: 'Выберите способ доставки' }
    },
    agreement: {
      isChecked: { message: 'Подтвердите согласие' }
    }
  }

  const singleValidate = (fieldName) => {
    const newErrors = validator(values, validatorConfig, fieldName)
    if (Object.keys(newErrors).length === 0) {
      const clearErrors = errors
      delete clearErrors[fieldName]
      setErrors(clearErrors)
    }
    setErrors((prevState) => ({ ...prevState, ...newErrors }))
  }

  useEffect(() => {
    for (const fieldName in values) {
      if (values[fieldName] !== '') {
        singleValidate(fieldName)
      }
    }
  }, [values])

  const deliveryTypes = [
    { name: 'Самовывоз из магазина (бесплатно)', id: 0 },
    { name: 'Почта России (400 руб.)', id: 400 },
    { name: 'Курьерская служба СДЭК (800 руб.)', id: 800 }
  ]

  if (brandsLoading) return 'Loading...'

  const handleChange = (target) => {
    setValues((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleBlur = ({ target }) => {
    singleValidate(target.name)
  }

  const validate = () => {
    const errors = validator(values, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return

    const userOrdersId = getNewId('userOrders')
    const orderId = getNewId('order')

    const newOrder = {
      orderId,
      created_at: Date.now(),
      fullname: values.fullname,
      email: values.email,
      phone: values.phone,
      address: values.address,
      deliveryType: values.deliveryType,
      comment: values.comment,
      items: userCart.items
    }

    if (!userOrders) {
      dispatch(
        createUserOrder({
          id: userOrdersId,
          userId: currentUserId,
          orders: { [orderId]: newOrder }
        })
      )
    } else {
      dispatch(
        updateUserOrders({
          ...userOrders,
          orders: { ...userOrders.orders, [orderId]: newOrder }
        })
      )
    }

    dispatch(
      updateUserCart({
        ...userCart,
        items: {}
      })
    )

    navigate('/order-accepted', { state: { id: orderId } })
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
        handleSubmitOrder(e)
      }
    }
  }

  if (userCartLoadingStatus && !userCart) return <Loader />
  if (!userCart || !userCart.items) return <EmptyCart />

  const filteredKnives = knives.filter((knife) =>
    Object.keys(userCart.items).includes(knife.id)
  )

  const total =
    filteredKnives.reduce((acc, knife) => {
      return acc + knife.price * userCart.items[knife.id].quantity
    }, 0) + Number(values.deliveryType)

  if (userLoadingStatus) return <Loader />

  return (
    <div className='order-wrapper'>
      <h1 className='order-title'>Оформление заказа</h1>
      <div className='flex-center-column w-50'>
        <div className='w-100 mt-4'>
          <p className='order-semibold'>Ваш заказ:</p>
          <ul className='order-list'>
            {filteredKnives.length
              ? filteredKnives.map((knife) => (
                  <li key={knife.id}>
                    <div className='d-flex w-100 justify-content-between'>
                      <span>
                        Нож{' '}
                        {brands.find((b) => b.id === knife.brand).name +
                          ' ' +
                          knife.model}
                      </span>
                      <span>
                        <Price price={knife.price} />
                        {' x ' + userCart.items[knife.id].quantity}
                      </span>
                    </div>
                    <hr />
                  </li>
                ))
              : 'Loading...'}
            <li>
              <div className='d-flex w-100 justify-content-between'>
                <span>Доставка</span>
                <span>
                  <Price price={values.deliveryType} />
                </span>
              </div>
              <hr />
            </li>
          </ul>
          <p className='cart-total w-100 d-flex justify-content-end'>
            Итого:&nbsp;
            <span className='fw-semibold'>
              <Price price={total} />
            </span>
          </p>
        </div>

        <form
          className='flex-center-column w-100 mt-4'
          onSubmit={handleSubmitOrder}
        >
          <p className='order-semibold'>Контактная информация:</p>

          <TextField
            label='Ф.И.О.'
            name='fullname'
            value={values.fullname}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={errors.fullname}
          />
          <TextField
            label='Телефон'
            name='phone'
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={errors.phone}
          />
          <TextField
            label='Электронная почта'
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={errors.email}
          />
          <TextField
            label='Адрес доставки'
            name='address'
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={errors.address}
          />
          <SelectField
            label='Способ доставки'
            name='deliveryType'
            value={values.deliveryType}
            defaultOption='Выберите способ доставки'
            options={deliveryTypes}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={errors.deliveryType}
          />
          <TextArea
            label='Комментарий к заказу'
            name='comment'
            value={values.comment}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={errors.comment}
          />
          <SingleCheckboxField
            label='Нажимая на кнопку, вы соглашаетесь на обработку персональных данных'
            name='agreement'
            value={values.agreement}
            onChange={handleChange}
            error={errors.agreement}
          />

          <button
            className='knife-button order-button mt-5'
            onClick={handleSubmitOrder}
            type='submit'
            disabled={!isValid}
          >
            Оформить заказ
          </button>
        </form>
      </div>

      <Link className='text-link mt-4' to='/cart'>
        Вернуться в корзину
      </Link>
    </div>
  )
}

export default OrderPage
