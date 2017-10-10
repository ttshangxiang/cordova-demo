<template>
  <div class="collect-list-page">
    <header-return :title="title">
      <span @click="expend">
        <span class="middle">{{title}}</span><i class="icon-arrow" :class="isExpend ? 'icon-up' : 'icon-down'"></i>
        <div class='select-box' v-show="isExpend">
            <div class="triangle"></div>
            <ul class="select-list">
              <li class="select-item"
                v-for="(item, index) in selectMap"
                :key="index"
                :class="{'active': selectValue === item.key}"
                @click="changeType(item)" v-html="item.title"></li>
            </ul>
          </div>
      </span>
    </header-return>
    <msg-cards :msgs="msgs" :getNextPageData="getNextPageData" :totalCount="totalCount" tabType="collect" @reload="initPageData()"></msg-cards>
  </div>
</template>

<script>
  import headerTab from '../components/header-tab.vue'
  import msgCards from '../components/msg-cards.vue'
  import headerReturn from '../components/header-return.vue'
  import MsgService from '../assets/js/fetch_service/msg.js'
  export default{
    components: {
      headerTab,
      headerReturn,
      msgCards
    },
    created () {
      this.initPageData()
    },
    data () {
      return {
        title: '全部收藏',
        selectValue: 'all',
        selectMap: [
          {title: '全部收藏', key: 'all'},
          {title: '风险消息', key: 'risk'},
          {title: '营销消息', key: 'marketing'}
        ],
        msgs: [],
        loadList: false,
        searchKeys: {
          count: 10,
          offset: 0,
          collected: true
        },
        totalCount: 0,
        isExpend: false
      }
    },
    methods: {
      initPageData () {
        console.log('aaa')
        var self = this
        MsgService.getMsgList(self.searchKeys, function (data) {
          if (data.status === 0) {
            self.msgs = data.data.data
            self.totalCount = data.data.total_count
            console.log(self.msgs.length)
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
      expend () {
        this.isExpend = !this.isExpend
      },
      changeType (item) {
        this.title = item.title
        this.selectValue = item.key
        this.searchKeys.offset = 0
        this.searchKeys.type = item.key
        if (item.key === 'all') {
          delete this.searchKeys.type
        }
        this.initPageData()
      }
    }
  }
</script>

<style scoped lang="scss">
  .collect-list-page{
    .msg-items{
      top: 45px;
    }
  }
  .middle {
    vertical-align: middle;
    margin-left: 20px;
  }
  .icon-arrow {
    display: inline-block;
    vertical-align: middle;
    background: url(../assets/img/arrow_down.png) no-repeat center center;
    background-size: 20px auto;
    width: 24px;
    height: 24px;
    margin-left: 2px;
  }
  .icon-down {
    background-image: url(../assets/img/arrow_down.png);
  }
  .icon-up {
    background-image: url(../assets/img/arrow_up.png);
  }
  .select-box {
    position: absolute;
    top: 95%;
    left: 50%;
    margin-left: -80px;
    width: 160px;
    z-index: 99;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 10px 0 rgba(142, 142, 142, 0.32);
    color: #666;
    font-size: 16px;
  }
  .triangle {
    width: 0;
    height: 0;
    border-width: 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent #fff;
    position: absolute;
    top: -8px;
    left: 50%;
    margin-left: -10px;
  }
  .select-item {
    line-height: 40px;
    &.active {
      color: #2178D4;
    }
  }
</style>
