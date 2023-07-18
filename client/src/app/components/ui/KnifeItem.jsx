import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Price from '../common/Price'
import AddToCartButton from './AddToCartButton'
import AddToFavoritesButton from './AddToFavoritesButton'

const KnifeItem = ({ knife }) => {
  const specs = `Краткие характеристики:
Тип клинка: ${knife.bladeType}
Тип замка: ${knife.lockType}
Материал клинка: ${knife.bladeMaterial}
Материал рукояти: ${knife.handleMaterial}`

  return (
    <div className='knife-item'>
      <Link
        className='flex-center-column image-link'
        title={specs}
        to={`/knives/${knife._id}`}
      >
        <img className='knife-image' src={knife.image} alt='' />
      </Link>
      <div>
        <Link className='knife-title' to={`/knives/${knife._id}`}>
          <span className='knife-title my-2'>
            {knife.brand + ' ' + knife.model}
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
