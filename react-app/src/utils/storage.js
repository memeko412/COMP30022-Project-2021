export const setLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocal = key => {
  const v = localStorage.getItem(key)
  return v ? JSON.parse(v) : ''
}

export const removeLocal = key => {
  localStorage.removeItem(key)
}
