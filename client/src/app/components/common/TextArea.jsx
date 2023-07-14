import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  onKeyDown,
  error
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return (
      'text-field login-field text-area-field' + (error ? ' invalid-field' : '')
    )
  }

  return (
    <div className='input-wrapper'>
      <div className='d-flex flex-column'>
        <label htmlFor={name} className='login-field-label'>
          {label + ':'}
        </label>
        <div className='flex-center-row'>
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className={getInputClasses()}
            autoComplete='on'
          />
        </div>
      </div>
      {error && <div className='invalid-field-message'>{error}</div>}
    </div>
  )
}

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  error: PropTypes.string
}

export default TextArea
