import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import login from '../view/login.vue'
import accountDetail from '../view/account_detail.vue'
import riskMsgList from '../view/risk_msg_list.vue'
import marketingMsgList from '../view/marketing_msg_list.vue'
import collectList from '../view/collect_list.vue'
import msgDetail from '../view/msg_detail.vue'
import thirdLogin from '../view/third_login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: thirdLogin,
      meta: { notRequireAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { notRequireAuth: true }
    },
    {
      path: '/account-detail',
      name: 'account-detail',
      component: accountDetail
    },
    {
      path: '/risk-msg-list',
      name: 'risk-msg-list',
      component: riskMsgList
    },
    {
      path: '/marketing-msg-list',
      name: 'marketing-msg-list',
      component: marketingMsgList
    },
    {
      path: '/collect-list',
      name: 'collect-list',
      component: collectList
    },
    {
      path: '/msg-detail',
      name: 'msgDetail',
      component: msgDetail
    }
  ]
})
