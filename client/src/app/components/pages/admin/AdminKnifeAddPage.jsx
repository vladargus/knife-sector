import React from 'react'
import AdminKnifeEditForm from '../../ui/AdminKnifeEditForm'
import { createKnife } from '../../../store/knives'

const AdminKnifeAddPage = () => {
  const initialData = {
    brand: '',
    model: '',
    price: '',
    image: '',
    overallLength: '',
    bladeLength: '',
    bladeThickness: '',
    bladeType: '',
    lockType: '',
    bladeMaterial: '',
    hardness: '',
    handleMaterial: '',
    color: '',
    country: '',
    weight: '',
    info: '',
    steelInfo: '',
    handleInfo: '',
    link: ''
  }

  return (
    <div className='flex-center-column auth-wrapper'>
      <h1 className='knife-detail-title'>Добавление новой позиции</h1>
      <p className='login-text mt-3'>Введите данные о ноже</p>
      <AdminKnifeEditForm initialData={initialData} onSubmit={createKnife} />
    </div>
  )
}

export default AdminKnifeAddPage
