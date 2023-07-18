import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { animateScroll as scroll } from 'react-scroll'
import { paginate } from '../../../utils/paginate'
import KnifeItem from '../../ui/KnifeItem'
import Loader from '../../common/Loader'
import Pagination from '../../common/Pagination'
import { getKnives } from '../../../store/knives'
import { getCurrentUserData } from '../../../store/users'
import EmptyFavorites from '../notifications/EmptyFavorites'

const FavoritesListPage = () => {
  const knives = useSelector(getKnives())
  const currentUser = useSelector(getCurrentUserData())
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 12

  const handlePageChange = (pageIndex) => {
    if (pageIndex === currentPage) return
    scroll.scrollToTop({ duration: 0, delay: 0, smooth: 'linear' })
    setCurrentPage(pageIndex)
  }

  if (!currentUser.favorites) {
    return <EmptyFavorites />
  }

  const filteredKnives = knives.filter(
    (knife) =>
      Object.keys(currentUser.favorites).includes(knife._id) &&
      currentUser.favorites[knife._id]
  )

  const count = filteredKnives.length

  const knivesCrop = paginate(filteredKnives, currentPage, pageSize)

  if (!knivesCrop.length && currentPage > 1) {
    setCurrentPage(currentPage - 1)
  }

  return (
    <div className='flex-center-row'>
      <div className='flex-center-column w-100'>
        <div className='items-wrapper w-100'>
          {count ? (
            knivesCrop.map((knife) => (
              <KnifeItem key={knife._id} knife={knife} />
            ))
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

export default FavoritesListPage
