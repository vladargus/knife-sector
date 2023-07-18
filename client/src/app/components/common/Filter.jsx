import React from 'react'
import PropTypes from 'prop-types'

const Filter = ({
  items,
  onItemSelect,
  valueProperty,
  contentProperty,
  selectedFilters,
  type
}) => {
  return (
    <div className='flex-center-column'>
      <ul className='list-group list-group-flush w-100'>
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            className={
              'list-group-item list-group-item-action list-group-item-light' +
              (selectedFilters[type].includes(item.name) ? ' active' : '')
            }
            onClick={() => onItemSelect(item, type)}
            role='button'
          >
            {type === 'colorsFilter' ? (
              <span
                className='badge px-2'
                style={{
                  background: `#${item.hex}`
                }}
              >
                {item[contentProperty]}
              </span>
            ) : (
              item[contentProperty]
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

Filter.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}

Filter.propTypes = {
  items: PropTypes.array,
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  onItemSelect: PropTypes.func,
  selectedFilters: PropTypes.object,
  type: PropTypes.string
}

export default Filter
