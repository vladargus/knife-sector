import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loader from '../common/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getBrandById, getBrandsLoadingStatus } from '../../store/brands'
import { removeKnife } from '../../store/knives'

const AdminKnifeItem = ({ knife }) => {
  const dispatch = useDispatch()
  const brand = useSelector(getBrandById(knife.brand))
  const brandsLoading = useSelector(getBrandsLoadingStatus())

  if (brandsLoading) return <Loader />

  return (
    <div className='admin-knife-item'>
      <Link
        className='flex-center-column admin-image-link'
        to={`/knives/${knife.id}`}
      >
        <img className='admin-knife-image' src={knife.image} alt='' />
      </Link>
      <Link className='admin-knife-title' to={`/knives/${knife.id}`}>
        <span className='admin-knife-title my-2'>
          {brand.name + ' ' + knife.model}
        </span>
      </Link>
      <div>
        <Link to={`/admin/knives/${knife.id}/edit`}>
          <button className='admin-knife-button me-3'>
            <i className='bi bi-pencil'></i>
          </button>
        </Link>
        <button
          className='admin-knife-button'
          onClick={() => dispatch(removeKnife(knife.id))}
        >
          <i className='bi bi-trash3'></i>
        </button>
      </div>
    </div>
  )
}

AdminKnifeItem.propTypes = {
  knife: PropTypes.object
}

export default AdminKnifeItem
