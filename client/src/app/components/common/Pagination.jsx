import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize)
  if (pageCount === 1) return null
  const pages = _.range(1, pageCount + 1)

  return (
    <nav>
      <ul className='pagination-list'>
        {pages.map((page) => (
          <li
            key={'page_' + page}
            className={
              'pagination-item' +
              (page === currentPage ? ' pagination-item-current' : '')
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
  currentPage: PropTypes.number
}

export default Pagination
