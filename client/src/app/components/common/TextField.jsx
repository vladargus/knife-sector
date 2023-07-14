import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  onKeyDown,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  const getInputClasses = () => {
    return (
      'text-field login-field' +
      (type === 'password' ? ' password-field' : '') +
      (error ? ' invalid-field' : '')
    )
  }
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }
  return (
    <div className='input-wrapper'>
      <div className='d-flex flex-column'>
        <label htmlFor={name} className='login-field-label'>
          {label + ':'}
        </label>
        <div className='flex-center-row'>
          <input
            type={showPassword ? 'text' : type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className={getInputClasses()}
            autoComplete='on'
          />
          {type === 'password' && (
            <button
              className='knife-button show-password-button'
              type='button'
              onClick={toggleShowPassword}
            >
              <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
            </button>
          )}
        </div>
      </div>
      {error && <div className='invalid-field-message'>{error}</div>}
    </div>
  )
}
TextField.defaultProps = {
  type: 'text'
}
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  error: PropTypes.string
}

export default TextField
