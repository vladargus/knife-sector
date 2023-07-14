import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error,
  name
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return (
      'text-field login-field select-field' +
      (error ? ' invalid-field invalid-select-field' : '')
    )
  }

  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.values(options).map((opt) => ({
          name: options[opt].name,
          value: options[opt].id
        }))
      : options.map((opt) => ({ name: opt.name, value: opt.id }))

  return (
    <div className='input-wrapper'>
      <div className='d-flex flex-column'>
        <label htmlFor={name} className='login-field-label'>
          {label + ':'}
        </label>
        <select
          className={getInputClasses()}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          autoComplete='false'
        >
          <option disabled value=''>
            {defaultOption}
          </option>
          {optionsArray.length > 0 &&
            optionsArray.map((option) => (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            ))}
        </select>
      </div>
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}

SelectField.propTypes = {
  defaultOption: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string
}

export default SelectField
