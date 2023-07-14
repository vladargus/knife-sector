import React, { useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import _ from 'lodash'
import { paginate } from '../../utils/paginate'
import FiltersList from '../ui/FiltersList'
import KnifeItem from '../ui/KnifeItem'
import Loader from '../common/Loader'
import Pagination from '../common/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../../store/brands'
import { getColors } from '../../store/colors'
import { getCountries } from '../../store/countries'
import { getBladeTypes } from '../../store/bladeTypes'
import { getLockTypes } from '../../store/lockTypes'
import { getKnives, loadKnivesList } from '../../store/knives'

const initialFilters = {
  brandsFilter: [],
  countriesFilter: [],
  colorsFilter: [],
  bladeTypesFilter: [],
  lockTypesFilter: []
}
const initialSort = { path: '', order: '' }

const KnivesListPage = () => {
  const knives = useSelector(getKnives())
  const brands = useSelector(getBrands())
  const colors = useSelector(getColors())
  const countries = useSelector(getCountries())
  const bladeTypes = useSelector(getBladeTypes())
  const lockTypes = useSelector(getLockTypes())
  const [selectedFilters, setSelectedFilters] = useState(initialFilters)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState(initialSort)
  const [searchData, setSearchData] = useState('')
  const dispatch = useDispatch()

  const pageSize = 12

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedFilters])

  const handlePageChange = (pageIndex) => {
    if (pageIndex === currentPage) return
    scroll.scrollToTop({ duration: 0, delay: 0, smooth: 'linear' })
    setCurrentPage(pageIndex)
  }

  const handleSelectFilter = (item, type) => {
    setCurrentPage(1)
    if (searchData !== '') setSearchData('')
    if (selectedFilters[type].includes(item.name)) {
      setSelectedFilters((prev) => ({
        ...prev,
        [type]: selectedFilters[type].filter((i) => i !== item.name)
      }))
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [type]: [...prev[type], item.name]
      }))
    }
  }

  const handleSort = (item) => {
    setCurrentPage(1)
    if (sortBy.path === item) {
      setSortBy((prevState) => ({
        ...prevState,
        order: prevState.order === 'asc' ? 'desc' : 'asc'
      }))
    } else {
      setSortBy({ path: item, order: 'asc' })
    }
  }

  const handleShuffle = () => {
    dispatch(loadKnivesList())
  }

  const handleSearch = ({ target }) => {
    setCurrentPage(1)
    setSelectedFilters(initialFilters)
    setSearchData(target.value)
  }

  const filtrate = (filter, data) => {
    return filter.length > 0 ? filter.includes(data) : true
  }

  const filteredKnives = searchData
    ? knives.filter((knife) => {
        const brand = brands.find((b) => b.id === knife.brand)
        const fullname = `${brand.name} ${knife.model}`
        return fullname.toLowerCase().includes(searchData.toLowerCase())
      })
    : Object.values(selectedFilters).some((arr) => arr.length > 0)
    ? knives.filter(
        (knife) =>
          filtrate(
            selectedFilters.brandsFilter,
            brands.find((b) => b.id === knife.brand).name
          ) &&
          filtrate(
            selectedFilters.countriesFilter,
            countries.find((c) => c.id === knife.country).name
          ) &&
          filtrate(
            selectedFilters.colorsFilter,
            colors.find((c) => c.id === knife.color).name
          ) &&
          filtrate(
            selectedFilters.bladeTypesFilter,
            bladeTypes.find((b) => b.id === knife.bladeType).name
          ) &&
          filtrate(
            selectedFilters.lockTypesFilter,
            lockTypes.find((l) => l.id === knife.lockType).name
          )
      )
    : knives

  const count = filteredKnives.length

  const sortedKnives = _.orderBy(
    filteredKnives.map((knife) => ({ ...knife, price: Number(knife.price) })),
    [sortBy.path],
    [sortBy.order]
  )

  const knivesCrop = paginate(sortedKnives, currentPage, pageSize)

  if (!knivesCrop.length && currentPage > 1) {
    setCurrentPage(currentPage - 1)
  }

  const clearFilter = () => {
    setSelectedFilters(initialFilters)
  }

  return (
    <div className='flex-center-row'>
      <FiltersList
        {...{
          brands,
          countries,
          colors,
          bladeTypes,
          lockTypes,
          handleSelectFilter,
          selectedFilters,
          clearFilter
        }}
      />
      <div className='flex-center-column w-100'>
        <div className='toolbar'>
          <div className='sorting-buttons'>
            <button
              className='knife-button sort-button'
              title='Сортировать'
              onClick={() => handleSort('price')}
            >
              {sortBy.order === 'asc' ? (
                <>
                  <span>По цене&nbsp;</span>
                  <i className='bi bi-arrow-up'></i>
                </>
              ) : sortBy.order === 'desc' ? (
                <>
                  <span>По цене&nbsp;</span>
                  <i className='bi bi-arrow-down'></i>
                </>
              ) : (
                <>
                  <span>По цене&nbsp;&nbsp;</span>
                  <i className='bi bi-arrow-down-up'></i>
                </>
              )}
            </button>

            <button
              className='knife-button shuffle-knives'
              title='Перемешать'
              onClick={() => handleShuffle()}
            >
              <i className='bi bi-shuffle'></i>
            </button>
            <button
              className='knife-button reset-sort'
              title='Сбросить сортировку'
              onClick={() => setSortBy(initialSort)}
            >
              <i className='bi bi-x-lg'></i>
            </button>
          </div>

          <input
            className='text-field search-field'
            type='text'
            name='search'
            placeholder='Найти по названию'
            value={searchData}
            onChange={handleSearch}
          />
        </div>

        <div className='items-wrapper w-100'>
          {count ? (
            knivesCrop.map((knife) => (
              <KnifeItem key={knife.id} knife={knife} />
            ))
          ) : selectedFilters !== initialFilters || searchData !== '' ? (
            <p className='notification notification-text'>
              Не найдено ни одного товара по данным критериям.
            </p>
          ) : (
            <Loader />
          )}
        </div>

        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default KnivesListPage
