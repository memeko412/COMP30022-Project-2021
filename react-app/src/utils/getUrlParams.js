const getUrlParams = url => {
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a, v) => {
    const [key, value] = v.split('=')
    if (a[key]) {
      a[key] = (typeof a[key] === 'string' ? [a[key]] : a[key]).concat(value)
    } else {
      a[key] = value
    }
    return a
  }, {})
}

export default getUrlParams
