/**
 * Created by Jamter on 17/5/20.
 */
import baseUrl from '../../../baseUrl'
import CryptoJS from '../tripledes'

CryptoJS.mode.ECB = (function () {
  var ECB = CryptoJS.lib.BlockCipherMode.extend()
  ECB.Encryptor = ECB.extend({
    processBlock: function (words, offset) {
      this._cipher.encryptBlock(words, offset)
    }
  })
  ECB.Decryptor = ECB.extend({
    processBlock: function (words, offset) {
      this._cipher.decryptBlock(words, offset)
    }
  })
  return ECB
}())

// 加密
function encryptByDES (message) {
  // 20170527深研一周年
  var keyHex = CryptoJS.enc.Utf8.parse('20170527')

  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

var login = function (username, password, resolveCallback, rejectCallback) {
  fetch(baseUrl + 'account/user/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: encryptByDES(password)
    })
  }).then(function (response) {
    return response.json()
  }).then(resolveCallback, rejectCallback).catch(function (e) {
  })
}

var getProfile = function (resolveCallback, rejectCallback) {
  fetch(baseUrl + 'account/user/profile', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }).then(function (response) {
    return response.json()
  }).then(resolveCallback, rejectCallback).catch(function (e) {
  })
}

// 百合园token登录
var loginByBhy = function (param) {
  return fetch(baseUrl + 'account/user/loginByBhy?' + window.fn.getQueryString(param), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export default {
  getProfile: getProfile,
  login: login,
  loginByBhy: loginByBhy
}
