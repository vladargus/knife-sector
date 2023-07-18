import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll'
import { paginate } from '../../../utils/paginate'
import AdminKnifeItem from '../../ui/AdminKnifeItem'
import Loader from '../../common/Loader'
import Pagination from '../../common/Pagination'
import { useSelector } from 'react-redux'
import { getKnives } from '../../../store/knives'

const AdminPage = () => {
  const knives = useSelector(getKnives())
  const [currentPage, setCurrentPage] = useState(1)
  const [searchData, setSearchData] = useState('')

  const pageSize = 12

  const handlePageChange = (pageIndex) => {
    if (pageIndex === currentPage) return
    scroll.scrollToTop({ duration: 0, delay: 0, smooth: 'linear' })
    setCurrentPage(pageIndex)
  }

  const handleSearch = ({ target }) => {
    setCurrentPage(1)
    setSearchData(target.value)
  }

  const filteredKnives = searchData
    ? knives.filter((knife) => {
        const fullname = `${knife.brand} ${knife.model}`
        return fullname.toLowerCase().includes(searchData.toLowerCase())
      })
    : knives

  const count = filteredKnives.length

  const knivesCrop = paginate(filteredKnives, currentPage, pageSize)

  if (!knivesCrop.length && currentPage > 1) {
    setCurrentPage(currentPage - 1)
  }

  return (
    <div className='flex-center-column w-100'>
      <h1 className='admin-title'>Админ-панель</h1>
      <div className='toolbar admin-toolbar'>
        <Link to={`/admin/knives/add`}>
          <button className='admin-knife-button px-4'>
            Добавить новую позицию<i className='bi bi-plus-circle ms-2'></i>
          </button>
        </Link>
        <input
          className='text-field search-field admin-search-field'
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
            <AdminKnifeItem key={knife._id} knife={knife} />
          ))
        ) : searchData !== '' ? (
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
  )
}

export default AdminPage
