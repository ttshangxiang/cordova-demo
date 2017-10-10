<template>
    <div class="login-page">
        <div class="logo-area"></div>
        <input class="username-input" type="text" placeholder="用户名" v-model="username">
        <input class="pass-input" type="password" placeholder="密码" v-model="password">
        <div class="validation-tips">6-20位字符，区分大小写</div>
        <div class="login-btn" @click="login">登录</div>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import AccountService from '../assets/js/fetch_service/account.js'
  export default{
    data () {
      var username
      var password
      return {
        username: username,
        password: password
      }
    },
    methods: {
      login () {
        var self = this
        AccountService.login(self.username, self.password, function (data) {
          if (!data.access_token) {
            Toast({
              message: data.msg,
              iconClass: 'icon icon-error',
              duration: 2000
            })
            return
          }
          localStorage.setItem('access_token', data.access_token)
          Toast({
            message: '登录成功',
            iconClass: 'icon icon-success',
            duration: 2000
          })
          window.location.href = '#/risk-msg-list'
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color:  #BDBDBD;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:  #BDBDBD;
        opacity:  1;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:  #BDBDBD;
        opacity:  1;
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color:  #BDBDBD;
    }
    .login-page{
        width: 309px;
        margin: 0 auto;
        text-align: center;
        .logo-area{
            display: inline-block;
            background: url(../assets/img/bank_logo.png);
            background-size: 169px auto;
            width: 169px;
            height: 50px;
            margin-top: 62px;
        }
        .username-input, .pass-input{
            &:focus {
                outline: none;
            }
            box-sizing: border-box;
            width: 309px;
            height: 44px;
            padding-left: 16px;
            border: 1.1px solid #BDBDBD;
            font-size: 14px;
        }
        .username-input{
            margin-top: 110px;
        }
        .pass-input{
            margin-top: 20px;
        }
        .validation-tips{
            width: 100%;
            margin-top: 8px;
            font-size: 12px;
            color: #BDBDBD;
            text-align: right;
        }
        .login-btn{
            display: inline-block;
            box-sizing: border-box;
            background: #2178D4;
            width: 169px;
            height: 42px;
            line-height: 42px;
            border-radius: 2px;
            margin-top: 41px;
            color: #fff;
            font-size: 16px;
        }
    }
</style>
