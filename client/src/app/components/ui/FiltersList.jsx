import React from 'react'
import PropTypes from 'prop-types'
import Filter from '../common/Filter'

const FiltersList = ({
  brands,
  countries,
  colors,
  bladeTypes,
  lockTypes,
  handleSelectFilter,
  selectedFilters,
  clearFilter
}) => {
  return (
    <div className='flex-center-column ms-5 w-25'>
      <div className='accordion' id='accordion1'>
        <div className='accordion-item'>
          <h5 className='accordion-title'>Фильтр</h5>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseOne'
              aria-expanded='true'
              aria-controls='collapseOne'
            >
              По бренду
            </button>
          </h2>
          <div id='collapseOne' className='accordion-collapse collapse'>
            <div className='accordion-body p-0'>
              {brands && (
                <Filter
                  items={brands}
                  onItemSelect={handleSelectFilter}
                  selectedFilters={selectedFilters}
                  type={'brandsFilter'}
                />
              )}
            </div>
          </div>
        </div>

        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseTwo'
              aria-expanded='false'
              aria-controls='collapseTwo'
            >
              По стране
            </button>
          </h2>
          <div id='collapseTwo' className='accordion-collapse collapse'>
            <div className='accordion-body p-0'>
              {countries && (
                <Filter
                  items={countries}
                  onItemSelect={handleSelectFilter}
                  selectedFilters={selectedFilters}
                  type={'countriesFilter'}
                />
              )}
            </div>
          </div>
        </div>

        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseThree'
              aria-expanded='false'
              aria-controls='collapseThree'
            >
              По цвету
            </button>
          </h2>
          <div id='collapseThree' className='accordion-collapse collapse'>
            <div className='accordion-body p-0'>
              {colors && (
                <Filter
                  items={colors}
                  onItemSelect={handleSelectFilter}
                  selectedFilters={selectedFilters}
                  type={'colorsFilter'}
                />
              )}
            </div>
          </div>
        </div>

        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseFour'
              aria-expanded='false'
              aria-controls='collapseFour'
            >
              По типу клинка
            </button>
          </h2>
          <div id='collapseFour' className='accordion-collapse collapse'>
            <div className='accordion-body p-0'>
              {bladeTypes && (
                <Filter
                  items={bladeTypes}
                  onItemSelect={handleSelectFilter}
                  selectedFilters={selectedFilters}
                  type={'bladeTypesFilter'}
                />
              )}
            </div>
          </div>
        </div>

        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseFive'
              aria-expanded='false'
              aria-controls='collapseFive'
            >
              По типу замка
            </button>
          </h2>
          <div id='collapseFive' className='accordion-collapse collapse'>
            <div className='accordion-body p-0'>
              {lockTypes && (
                <Filter
                  items={lockTypes}
                  onItemSelect={handleSelectFilter}
                  selectedFilters={selectedFilters}
                  type={'lockTypesFilter'}
                />
              )}
            </div>
          </div>
        </div>

        <div className='accordion-item'>
          <button className='clear-filter-button' onClick={clearFilter}>
            Очистить фильтр<i className='bi bi-x-lg ms-2'></i>
          </button>
        </div>
      </div>
    </div>
  )
}
FiltersList.propTypes = {
  brands: PropTypes.array,
  countries: PropTypes.array,
  colors: PropTypes.array,
  bladeTypes: PropTypes.array,
  lockTypes: PropTypes.array,
  handleSelectFilter: PropTypes.func,
  selectedFilters: PropTypes.object,
  clearFilter: PropTypes.func
}

export default FiltersList
