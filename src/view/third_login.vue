<template>
  <div class="third-login-tips">{{tips}}</div> 
</template>

<script>
  import {
    Toast
  } from 'mint-ui'
  import AccountService from '../assets/js/fetch_service/account.js'
  export default {
    data () {
      return {
        tips: null
      }
    },
    methods: {
      tips (msg, icon) {
        if (this.instance) {
          this.instance.close()
        }
        this.instance = Toast({
          message: msg,
          iconClass: 'icon ' + icon,
          duration: -1
        })
      },
      loginSuccess (accessToken) {
        if (!accessToken) {
          return false
        }
        this.instance && this.instance.close()
        localStorage.setItem('access_token', accessToken)
        this.tips = '登录成功，跳转中...'
        window.location.href = '#/risk-msg-list'
        return true
      }
    },
    mounted () {
      let token = window.fn.getQueryVariable('mx_sso_token')
      if (!token) {
        token = localStorage.getItem('mx_sso_token')
        if (!token) {
          window.location.href = '#/login'
          return
        }
      } else {
        localStorage.setItem('mx_sso_token', token)
      }
      this.tips = '登录中...'
      AccountService.loginByBhy({
        'mx_sso_token': token
      }).then(response => {
        return response.json()
      }).then(data => {
        if (!data.access_token) {
          this.tips = '登录失败 ' + data.msg
          return false
        } else {
          this.loginSuccess(data.access_token, data.msg)
        }
      })
      .catch(e => {
        this.tips = '登录失败，服务器出错'
      })
    }
  }

</script>

<style>
  .third-login-tips {
    color: #333;
    padding: .6rem;
    font-size: 0.4rem;
  }
</style>
