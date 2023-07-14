import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import AdminKnifeEditForm from '../../ui/AdminKnifeEditForm'
import { useSelector } from 'react-redux'
import { getKnifeById, updateKnife } from '../../../store/knives'

const AdminKnifeEditPage = () => {
  const params = useParams()
  const { knifeId } = params
  const knife = useSelector(getKnifeById(knifeId))
  if (!knife) return <Navigate to='/page-not-found' />

  return (
    <div className='flex-center-column edit-knife-wrapper'>
      <h1 className='knife-detail-title'>Изменение позиции</h1>
      <p className='login-text mt-3'>Введите данные о ноже</p>
      <AdminKnifeEditForm initialData={knife} onSubmit={updateKnife} />
    </div>
  )
}

export default AdminKnifeEditPage
