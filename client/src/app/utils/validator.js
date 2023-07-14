export function validator(data, config, fieldName) {
  const errors = {}
  function validate(validateMethod, data, config) {
    let statusValidate
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') {
          statusValidate = !data
        } else {
          statusValidate =
            (data.isInteger ? data.toString() : data).trim() === ''
        }
        break
      }
      case 'isName': {
        const nameRegExp = /^[a-zA-Zа-яА-Я ,.'-]+$/g
        statusValidate = !nameRegExp.test(data)
        break
      }
      case 'isSurname': {
        const surnameRegExp = /^[a-zA-Zа-яА-Я ,.'-]+$/g
        statusValidate = !surnameRegExp.test(data)
        break
      }
      case 'isPhone': {
        const surnameRegExp =
          /^(\+7|7|8){1}[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/g
        statusValidate = !surnameRegExp.test(data)
        break
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g
        statusValidate = !emailRegExp.test(data)
        break
      }
      case 'isLatin': {
        const latinRegExp = /[А-Яа-я]+/g
        statusValidate = latinRegExp.test(data)
        break
      }
      case 'noSpaces': {
        const noSpacesRegExp = /\s+/g
        statusValidate = noSpacesRegExp.test(data)
        break
      }
      case 'isCapitalSymbol': {
        const capitalRegExp = /[A-Z]+/g
        statusValidate = !capitalRegExp.test(data)
        break
      }
      case 'isContainDigit': {
        const digitRegExp = /\d+/g
        statusValidate = !digitRegExp.test(data)
        break
      }
      case 'min': {
        statusValidate = data.length < config.value
        break
      }
      case 'isChecked': {
        statusValidate = !data
        break
      }
      default:
        break
    }
    if (statusValidate) return config.message
  }

  function singleValidate(fieldName) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      )
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }

  if (!fieldName) {
    for (const fieldName in data) {
      singleValidate(fieldName)
    }
  }
  if (fieldName) {
    singleValidate(fieldName)
  }

  return errors
}
