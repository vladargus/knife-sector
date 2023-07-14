import React from 'react'
import PropTypes from 'prop-types'

const Price = ({ price }) => {
  return (
    <span>
      {new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
      }).format(price)}
    </span>
  )
}

Price.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Price
