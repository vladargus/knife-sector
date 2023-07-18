export function displayDate(data) {
  // const date = new Date(data)
  const date = new Date(parseInt(data))

  return (
    date.getDate() +
    '.' +
    (date.getMonth() + 1) +
    '.' +
    date.getFullYear() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes()
  )
}
