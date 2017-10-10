<template>
    <div class="risk-list-page">
        <header-tab :config="tabConfig" :selectSubTypeFn="selectSubType"  @update-X="updateX" ref="headerTab"></header-tab>
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
      data () {
        let subIndex = window.riskIndex = window.riskIndex || 0
        return {
          tabConfig: {
            parent: {
              arr: [{name: '风险信息', href: '#/risk-msg-list'}, {name: '营销信息', href: '#/marketing-msg-list'}],
              activeIndex: 0
            },
            sub: {
              arr: [
                {cn_name: '开庭公告', en_name: 'court_ktgg'},
                /* 消息中心详情页面，法院公告字段在企业详情页面后端返回的是court_fygg, 在这里后端只认bulletin */
                {cn_name: '法院公告', en_name: 'bulletin'},
                {cn_name: '审判流程', en_name: 'judge_process'},
                {cn_name: '裁判文书', en_name: 'judgement_wenshu'},
                {cn_name: '失信被执行', en_name: 'shixin_info'},
                {cn_name: '欠税公告', en_name: 'owing_tax'},
                {cn_name: '行政处罚', en_name: 'penalty'},
                {cn_name: '经营状态变更', en_name: 'business_status_change'}
              ],
              activeIndex: subIndex
            }
          },
          msgs: [],
          totalCount: 0,
          searchKeys: {
            type: 'risk',
            sub_type: 'court_ktgg',
            count: 10,
            offset: 0
          }
        }
      },
      created: function () {
        this.selectSubType(this._data.tabConfig.sub.arr[window.riskIndex].en_name, window.riskIndex)
      },
      methods: {
        initPageData () {
          var self = this
          MsgService.getMsgList(self.searchKeys, function (data) {
            if (data.status === 0) {
              self.msgs = data.data.data
              self.totalCount = data.data.total_count
            }
          })
          MsgService.getNotReadNums('risk', function (data) {
            if (data.status === 0) {
              data = data.data
              self.tabConfig.sub.arr.forEach(function (item, index) {
                item.notReadNum = data[item.en_name]
//                self.tagConfig.sub.arr.$set(index, JSON.parse(JSON.stringify(item)))
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
          window.riskIndex = index
          self.initPageData()
        },
        updateX (x) {
          window.riskScrollX = x
        }
      }
    }
</script>

<style scoped lang="scss">
    .risk-list-page{
    }
</style>
