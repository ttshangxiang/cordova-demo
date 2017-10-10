if (!window.fn) {
  window.fn = {}
}
window.fn.getQueryString = function (paramObj) {
  var tempArr = []
  for (var key in paramObj) {
    tempArr.push(key + '=' + paramObj[key])
  }
  return tempArr.join('&')
}

window.fn.getQueryVariable = function (variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return (false)
}
