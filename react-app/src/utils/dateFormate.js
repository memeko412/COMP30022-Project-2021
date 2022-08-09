const padLeft = (value, num = 2, fill = '0') => String(value).padStart(num, fill)

const dteformat = (date, format) => {
  let originTime = date

  if (typeof date === 'string' || typeof date === 'number') {
    if (originTime.toString().length === 10) {
      originTime = Number(originTime) * 1000
    }
  }

  const d = new Date(originTime)

  const time = {
    YYYY: padLeft(d.getFullYear()),
    MM: padLeft(d.getMonth() + 1),
    DD: padLeft(d.getDate()),
    HH: padLeft(d.getHours()),
    mm: padLeft(d.getMinutes()),
    ss: padLeft(d.getSeconds()),
    M: padLeft(d.getMilliseconds(), 3)
  }
  return format.replace(new RegExp(`${Object.keys(time).join('|')}`, 'g'), subStr => {
    return time[subStr] || ''
  })
}

export default dteformat
