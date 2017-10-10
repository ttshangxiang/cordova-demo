<template>
    <iscroll-view  ref="scrollView" class="scroll-view msg-items" :options="{click:true, scrollY: true, mouseWheel: true, probeType: 1}"  :scrollerClass="{'scroller': true}"  @scroll="scrolling" @scrollEnd="scrollEnd">
      <div v-for="(item, $index) in msgs">
        <div class="date-separation-area" v-if="item.isFirstDisplayDate"> {{ item.push_time  | moment('YYYY-MM-DD')}}</div>
        <div class="separation-area" v-else></div>
        <div class="msg-item" >
          <a :class="{'title': true, 'read': item.read === 1}" v-html="getTitle(item)" :href="'#/msg-detail?msgId=' + item.id + '&type=' + item.type_en_name + '&subType=' + item.sub_type_en_name + '&read=' + item.read"></a>
          <div class="bottom-line clearfix">
            <div class="company-name" v-html="item.company"></div>
            <div class="right-part clearfix">
              <div class="collect-icon " v-bind:class="item.collected?'icon-has-collect': 'icon-not-collect'"  @click="setCollect(item, $index)"></div>
              <div class="date">{{item.push_time | moment('YYYY-MM-DD')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="data-load-tips">{{loadStatusConfig[loadStatus]}}</div>
    </iscroll-view>
</template>

<script>
  import {Toast} from 'mint-ui'
  import moment from 'moment'
  export default{
    props: ['totalCount', 'msgs', 'getNextPageData', 'tabType'],
    created () {
    },
    updated () {
      this.refresh()
    },
    data () {
      let loadStatus = ''
      if (this.msgs.length < this.totalCount) {
        loadStatus = 'canLoad'
      } else {
        loadStatus = 'canNotLoad'
      }
      return {
        loadStatus: loadStatus,
        loadStatusConfig: {
          canLoad: '上拉加载更多',
          canNotLoad: '没有更多数据~',
          willLoad: '松手开始加载',
          loading: '加载中...'
        }
      }
    },
    watch: {
      msgs: function (newVal, oldVal) {
        let dateObj = {}
        let date = ''
        let self = this
        newVal.forEach(function (item) {
          date = moment(item.push_time).format('YYYY-MM-DD')
          if (!dateObj[date]) {
            dateObj[date] = true
            item.isFirstDisplayDate = true
          }
        })
        if (self.msgs.length < self.totalCount) {
          self.loadStatus = 'canLoad'
        } else {
          self.loadStatus = 'canNotLoad'
        }
      }
    },
    methods: {
      refresh () {
        var self = this
        console.log(self.$refs.scrollView)
        self.$refs.scrollView.refresh()
      },
      scrolling () {
        var self = this
        let iscroll = self.$refs.scrollView.iscroll
        if (self.msgs.length < self.totalCount) {
          if (Math.abs(iscroll.y) - Math.abs(iscroll.maxScrollY) > 10) {
            self.loadStatus = 'willLoad'
          } else {
            self.loadStatus = 'canLoad'
          }
        } else {
          self.loadStatus = 'canNotLoad'
        }
      },
      scrollEnd () {
        var self = this
        if (self.msgs.length < self.totalCount) {
          if (self.loadStatus === 'willLoad') {
            self.loadStatus = 'loading'
            self.getNextPageData()
          } else {
            self.loadStatus = 'canLoad'
          }
        } else {
          self.loadStatus = 'canNotLoad'
        }
      },
      setCollect (item, index) {
        var ids = []
        var collect = !item.collected
        ids.push(item.id)
        var self = this
        fetch('/hz/api/notification/set_collect', {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ids: ids,
            collect: collect
          })
        }).then(function (response) {
          return response.json()
        }).then(function (data) {
          if (data.status === 0) {
            if (collect) {
              Toast('收藏成功')
            } else {
              Toast('已取消收藏')
              if (self.tabType === 'collect') {
                self.msgs.splice(index, 1)
                self.$emit('reload')
              }
            }
            item.collected = collect
          }
        }).catch(function (e) {
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
<style lang="scss">
  .msg-items {
    position: absolute;
    z-index: 1;
    top: 85px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background-color: #F7F7F7;
    touch-action: none;
    .scroller{
    }
    .msg-item {
      background: #fff;
      padding: 14px 12px 16px 14px;
      border-top: 1px solid #EFEFEF;
      border-bottom: 1px solid #EFEFEF;

      .title {
        display: block;
        color: #333;
        font-size: 16px;
        &.read {
          color: #999
        }
      }

      .company-name {
        margin-top: 6px;
        color: #999;
        font-size: 14px;
        padding-right: 2.7rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .bottom-line {
        position: relative;
        margin-top: 16px;

      .type {
        float: left;
        display: inline-block;
        background: #F0F0F0;
        padding: 6px 9px;
        border-radius: 100px;
        color: #2178D4;
        font-size: 12px;
      }
      .right-part {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        height: 24px;
        line-height: 24px;
        margin: auto 0;
        .date {
          float: right;
          margin-right: 10px;
          color: #BDBDBD;
          font-size: 12px;
        }

        .collect-icon {
          float: right;
          background-size: 24px auto;
          width: 24px;
          height: 24px;
        }

        .icon-has-collect {
          background-image: url(../assets/img/has_collect.png);
        }

        .icon-not-collect {
          background-image: url(../assets/img/not_collect.png);
        }

        }
      }
    }
    .data-load-tips{
      padding: 15px 0 10px 0;
      text-align: center;
      color: #999;
      font-size: 12px;
    }
    .date-separation-area{
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: 12px;
      color: #BDBDBD;
    }
    .separation-area{
      height: 10px;
    }
  }

</style>
