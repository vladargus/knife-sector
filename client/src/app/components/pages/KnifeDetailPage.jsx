import React, { useEffect } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import PropTypes from 'prop-types'
import Price from '../common/Price'
import Loader from '../common/Loader'
import { Navigate, useParams } from 'react-router-dom'
import AddToCartButton from '../ui/AddToCartButton'
import { useSelector } from 'react-redux'
import { getColorByName, getColorsLoadingStatus } from '../../store/colors'
import { getKnifeById } from '../../store/knives'
import AddToFavoritesButton from '../ui/AddToFavoritesButton'

const KnifeDetailPage = () => {
  const params = useParams()
  const { knifeId } = params
  const colorsLoading = useSelector(getColorsLoadingStatus())

  const knife = useSelector(getKnifeById(knifeId))
  if (!knife) return <Navigate to='/page-not-found' />

  const color = useSelector(getColorByName(knife.color))

  useEffect(() => {
    scroll.scrollToTop({ duration: 0, delay: 0, smooth: 'linear' })
  }, [])

  if (colorsLoading) {
    return <Loader />
  }

  return (
    !!Object.keys(knife).length && (
      <div className='flex-center-column'>
        <div className='knife-detail-wrapper'>
          <h1 className='knife-detail-title'>
            Складной нож {knife.brand} {knife.model}, сталь{' '}
            {knife.bladeMaterial}
          </h1>

          <div className='knife-detail-top'>
            <a
              className='knife-detail-image-link'
              href={knife.image}
              title='Открыть изображение в новой вкладке'
              target='_blank'
              rel='noreferrer'
            >
              <img className='knife-detail-image' src={knife.image} alt='' />
            </a>

            <div className='flex-center-column'>
              <ul className='specs-list'>
                <p className='specs-list-title'>Характеристики:</p>
                <li>Длина ножа: {knife.overallLength} мм</li>
                <li>Длина клинка: {knife.bladeLength} мм</li>
                <li>Толщина клинка: {knife.bladeThickness} мм</li>
                <li>Тип клинка: {knife.bladeType}</li>
                <li>Тип замка: {knife.lockType}</li>
                <li>Материал клинка: {knife.bladeMaterial}</li>
                <li>Твердость стали: {knife.hardness} HRC</li>
                <li>Материал рукояти: {knife.handleMaterial}</li>
                <li>
                  Цвет:{' '}
                  {color && (
                    <span
                      className='badge px-2'
                      style={{ background: `#${color.hex}` }}
                    >
                      {color.name}
                    </span>
                  )}
                </li>
                <li>Страна: {knife.country}</li>
                <li>Вес: {knife.weight} гр</li>
              </ul>

              <div className='knife-detail-price'>
                <Price price={knife.price} />
              </div>

              <div className='d-flex justify-content-between'>
                <AddToCartButton knife={knife} label='Добавить в корзину' />
                <AddToFavoritesButton knife={knife} />
              </div>
            </div>
          </div>

          <div className='knife-detail-info'>
            <p>Описание:</p>
            <p>{knife.info}</p>
            <p>{knife.steelInfo}</p>
            <p>{knife.handleInfo}</p>
          </div>
        </div>
      </div>
    )
  )
}
KnifeDetailPage.propTypes = {
  knifeId: PropTypes.string
}

export default KnifeDetailPage
