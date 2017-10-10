/**
 * Created by Jamter on 17/5/20.
 */
import baseUrl from '../../../baseUrl'

var getMsgList = function (searchKeys, resolveCallback, rejectCallback) {
  fetch(baseUrl + 'notification/msgs?' + window.fn.getQueryString(searchKeys), {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }).then(function (response) {
    return response.json()
  }).then(resolveCallback, rejectCallback).catch(function (e) {
  })
}
var getNotReadNums = function (type, resolveCallback, rejectCallback) {
  fetch(baseUrl + 'notification/not_read_nums?type=' + type, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }).then(function (response) {
    return response.json()
  }).then(resolveCallback, rejectCallback).catch(function (e) {
  })
}
var getMsgDetail = function (msgId, resolveCallback, rejectCallback) {
  fetch(baseUrl + 'notification/msg_detail?id=' + msgId, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }).then(function (response) {
    return response.json()
  }).then(resolveCallback, rejectCallback).catch(function (e) {
  })
}
var readMsgs = function (ids, resolveCallback, rejectCallback) {
  fetch(baseUrl + 'notification/read_msgs', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    },
    body: JSON.stringify({
      ids: ids
    })
  }).then(function (response) {
    return response.json()
  }).then(resolveCallback, rejectCallback).catch(function (e) {
  })
}

export default {
  getMsgList: getMsgList,
  getMsgDetail: getMsgDetail,
  getNotReadNums: getNotReadNums,
  readMsgs: readMsgs
}
