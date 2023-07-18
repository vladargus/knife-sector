import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeKnife } from '../../store/knives'

const AdminKnifeItem = ({ knife }) => {
  const dispatch = useDispatch()

  const handleRemoveKnife = () => {
    if (confirm('Вы уверены что хотите удалить данную позицию?')) {
      dispatch(removeKnife(knife._id))
    }
  }

  return (
    <div className='admin-knife-item'>
      <Link
        className='flex-center-column admin-image-link'
        to={`/knives/${knife._id}`}
      >
        <img className='admin-knife-image' src={knife.image} alt='' />
      </Link>
      <Link className='admin-knife-title' to={`/knives/${knife._id}`}>
        <span className='admin-knife-title my-2'>
          {knife.brand + ' ' + knife.model}
        </span>
      </Link>
      <div>
        <Link to={`/admin/knives/${knife._id}/edit`}>
          <button className='admin-knife-button me-3'>
            <i className='bi bi-pencil'></i>
          </button>
        </Link>
        <button className='admin-knife-button' onClick={handleRemoveKnife}>
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
