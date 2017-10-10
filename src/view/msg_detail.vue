<template>
  <div class="msg-list-page">
    <header-return :title="title"></header-return>
    <div class="msg-detail-board">
      <div class="msg-header">
        <div class="title"> {{ getTitle(detailObj) }} </div>
        <div class="sub-title">
          <div class="date">{{ detailObj.push_time |  moment('YYYY-MM-DD')}}</div>
          <!--<div class="v-gap"></div>-->
          <!--<div class="origin">来源: <a href="">源站点</a></div>-->
        </div>
      </div>
      <div class="msg-content">
        <!--{{JSON.stringify(detailObj.detail)}}-->
        <!--<detail-list v-if="subType==='new_invested_company'"></detail-list>-->
        <detail-list v-if="detailObj.detail && configObj[type][subType].showType === 'list'" :list="detailObj.detail.list"></detail-list>
        <detail-map v-if="detailObj.detail && configObj[type][subType].showType !== 'list'" :configArr="configObj[type][subType].cols" :detailObj="detailObj.detail"></detail-map>
      </div>
    </div>
  </div>
</template>

<script>
  import headerTab from '../components/header-tab.vue'
  import msgCards from '../components/msg-cards.vue'
  import headerReturn from '../components/header-return.vue'
  import detailMap from '../components/detail-map.vue'
  import detailList from '../components/detail-list.vue'
  import MsgService from '../assets/js/fetch_service/msg.js'
  import configObj from '../assets/js/msg.config'
  configObj.risk.bulletin = configObj.risk.court_fygg
  export default{
    components: {
      headerTab,
      headerReturn,
      msgCards,
      detailMap,
      detailList
    },
    data () {
      return {
        title: '消息详情',
        msgs: [{title: '温州市万科房地产开发有限公司与温州市工商行政管理局等工商行政处理上诉案', company: '小米科技有限责任公司', type: '裁判文书', date: '2016-11-27', collected: true},
          {title: '温州市万科房地产开发有限公司与温州市工商行政管理局等工商行政处理上诉案', company: '小米科技有限责任公司', type: '裁判文书', date: '2016-11-27', collected: false},
          {title: '温州市万科房地产开发有限公司与温州市工商行政管理局等工商行政处理上诉案', company: '小米科技有限责任公司', type: '裁判文书', date: '2016-11-27', collected: false},
          {title: '温州市万科房地产开发有限公司与温州市工商行政管理局等工商行政处理上诉案', company: '小米科技有限责任公司', type: '裁判文书', date: '2016-11-27', collected: true},
          {title: '温州市万科房地产开发有限公司与温州市工商行政管理局等工商行政处理上诉案', company: '小米科技有限责任公司', type: '裁判文书', date: '2016-11-27', collected: false},
          {title: '温州市万科房地产开发有限公司与温州市工商行政管理局等工商行政处理上诉案', company: '小米科技有限责任公司', type: '裁判文书', date: '2016-11-27', collected: true}
        ],
        msgId: this.$route.query['msgId'],
        type: this.$route.query['type'],
        subType: this.$route.query['subType'],
        read: this.$route.query['read'] === '1',
        detailObj: {},
        configObj: configObj
      }
    },
    created () {
      this.getMsgDetail()
      if (!this._data.read) {
        this.readMsg()
      }
    },
    methods: {
      getMsgDetail () {
        var self = this
        MsgService.getMsgDetail(self.msgId, function (data) {
          if (data.status === 0) {
            self.detailObj = data.data
          }
        })
      },
      readMsg () {
        let self = this
        let ids = [self.msgId]
        MsgService.readMsgs(ids, function (data) {
          if (data.status === 0) {
          }
        })
      },
      getTitle (item) {
        if (!item.title || item.title === '-') {
          return item.sub_type_cn_name
        }
        return item.title
      }
    }
  }
</script>

<style scoped lang="scss">
  .msg-list-page{
    background: #fff;
    .msg-detail-board{
      padding: 0 12px 20px 12px;
      margin-top: 20px;
      .msg-header{
        .title{
          font-size: 18px;
          color: #333333;
        }
        .sub-title{
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #999999;
          .date{
          }
          .v-gap{
            background: #DDDDDD;
            width: 1px;
            height: 10px;
            margin: 0 8px;
          }
          .origin{
            >a{
              color: #2178D4;
            }
          }
        }
      }
      .msg-content{
        padding-top: 10px;
      }

    }
  }
</style>
