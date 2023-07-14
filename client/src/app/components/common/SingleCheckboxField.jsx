import React from 'react'
import PropTypes from 'prop-types'

const SingleCheckboxField = ({ name, label, value, onChange, error }) => {
  const getOptionId = (value, label) => `${value}_${label}`
  const id = getOptionId(value, label)

  const getInputClasses = () => {
    return 'form-check-input' + (error ? ' is-invalid' : '')
  }

  const handleChange = () => {
    onChange({ name, value: !value })
  }

  return (
    <div className='form-check form-check-inline mt-3'>
      <input
        className={getInputClasses()}
        type='checkbox'
        id={id}
        name={name}
        value={value}
        checked={value}
        onChange={handleChange}
      />
      <label className='form-check-label' htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

SingleCheckboxField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default SingleCheckboxField
