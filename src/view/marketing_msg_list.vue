<template>
  <div class="maketing-list-page">
    <header-tab :config="tabConfig" :selectSubTypeFn="selectSubType" @update-X="updateX"></header-tab>
    <msg-cards :msgs="msgs" :getNextPageData="getNextPageData" :totalCount="totalCount"></msg-cards>
  </div>
</template>

<script>
  import headerTab from '../components/header-tab.vue'
  import msgCards from '../components/msg-cards.vue'
  import MsgService from '../assets/js/fetch_service/msg.js'
  export default{
    components: {
      headerTab,
      msgCards
    },
    created: function () {
      this.selectSubType(this._data.tabConfig.sub.arr[window.marketingIndex].en_name, window.marketingIndex)
    },
    data () {
      let subIndex = window.marketingIndex = window.marketingIndex || 0
      return {
        tabConfig: {
          parent: {
            arr: [{name: '风险信息', href: '#/risk-msg-list'}, {name: '营销信息', href: '#/marketing-msg-list'}],
            activeIndex: 1
          },
          sub: {
            arr: [
              {cn_name: '企业股东中新出现上市公司', en_name: 'new_listed_shareholder'},
              {cn_name: '企业被公布纳税等级为A', en_name: 'tax_payer_level_A'},
              {cn_name: '企业招标', en_name: 'bid_info'},
              {cn_name: '企业中标', en_name: 'win_info'},
              {cn_name: '企业新增分支机构', en_name: 'new_affiliate'},
              {cn_name: '企业新增对外投资', en_name: 'new_invested_company'}
            ],
            activeIndex: subIndex
          }

        },
        msgs: [],
        totalCount: 0,
        searchKeys: {
          type: 'marketing',
          sub_type: 'new_listed_shareholder',
          count: 10,
          offset: 0
        }
      }
    },
    methods: {
      initPageData () {
        var self = this
        self.searchKeys.offset = 0
        MsgService.getMsgList(self.searchKeys, function (data) {
          if (data.status === 0) {
            self.msgs = data.data.data
            self.totalCount = data.data.total_count
            console.log(self.msgs.length)
          }
        })
        MsgService.getNotReadNums('marketing', function (data) {
          if (data.status === 0) {
            data = data.data
            self.tabConfig.sub.arr.forEach(function (item) {
              item.notReadNum = data[item.en_name]
            })
            self.tabConfig = Object.assign({}, self.tabConfig)
          }
        })
      },
      getNextPageData () {
        var self = this
        self.searchKeys.offset += self.searchKeys.count
        MsgService.getMsgList(self.searchKeys, function (data) {
          if (data.status === 0) {
            self.msgs = self.msgs.concat(data.data.data)
            self.totalCount = data.data.total_count
            console.log(self.msgs.length)
          }
        })
      },
      selectSubType (subType, index) {
        var self = this
        self.searchKeys.sub_type = subType
        self.searchKeys.offset = 0
        window.marketingIndex = index
        self.initPageData()
      },
      updateX (x) {
        window.marketingScrollX = x
      }
    }
  }
</script>

<style scoped lang="scss">
  .maketing-list-page{
  }
</style>
