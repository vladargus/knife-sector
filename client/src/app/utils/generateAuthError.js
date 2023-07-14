export function generateAuthError(message) {
  switch (message) {
    case 'EMAIL_NOT_FOUND':
      return 'Пользователь с таким e-mail не найден'

    case 'INVALID_PASSWORD':
      return 'Неверно введен пароль'

    case 'EMAIL_EXISTS':
      return 'Пользователь с таким e-mail уже существует'

    default:
      return 'Слишком много попыток входа. Попробуйте позже.'
  }
}
