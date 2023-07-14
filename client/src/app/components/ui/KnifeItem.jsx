import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getBrandById, getBrandsLoadingStatus } from '../../store/brands'
import {
  getBladeTypeById,
  getBladeTypesLoadingStatus
} from '../../store/bladeTypes'
import {
  getLockTypeById,
  getLockTypesLoadingStatus
} from '../../store/lockTypes'
import Price from '../common/Price'
import Loader from '../common/Loader'
import AddToCartButton from './AddToCartButton'
import AddToFavoritesButton from './AddToFavoritesButton'

const KnifeItem = ({ knife }) => {
  const brand = useSelector(getBrandById(knife.brand))
  const brandsLoading = useSelector(getBrandsLoadingStatus())
  const bladeType = useSelector(getBladeTypeById(knife.bladeType))
  const bladeTypesLoading = useSelector(getBladeTypesLoadingStatus())
  const lockType = useSelector(getLockTypeById(knife.lockType))
  const lockTypesLoading = useSelector(getLockTypesLoadingStatus())

  if (brandsLoading || bladeTypesLoading || lockTypesLoading) return <Loader />

  const specs = `Краткие характеристики:
Тип клинка: ${bladeType.name}
Тип замка: ${lockType.name}
Материал клинка: ${knife.bladeMaterial}
Материал рукояти: ${knife.handleMaterial}`

  return (
    <div className='knife-item'>
      <Link
        className='flex-center-column image-link'
        title={specs}
        to={`/knives/${knife.id}`}
      >
        <img className='knife-image' src={knife.image} alt='' />
      </Link>
      <div>
        <Link className='knife-title' to={`/knives/${knife.id}`}>
          <span className='knife-title my-2'>
            {brand.name + ' ' + knife.model}
          </span>
        </Link>
        <div className='mt-2'>
          <Price price={knife.price} />
        </div>
        <div className='d-flex justify-content-between'>
          <AddToCartButton knife={knife} />
          <AddToFavoritesButton knife={knife} />
        </div>
      </div>
    </div>
  )
}

KnifeItem.propTypes = {
  knife: PropTypes.object
}

export default KnifeItem
