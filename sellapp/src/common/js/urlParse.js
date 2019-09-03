export function urlParse () {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let temp = item.substr(1).split('=')
      let key = temp[0]
      let val = temp[1]
      obj[key] = val
    })
  }
  return obj
}
