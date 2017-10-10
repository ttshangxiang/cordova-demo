<template>
    <div class="header-tabs-area">
      <div class="parent-tabs-area">
        <a class="link-btn icon-collect-link" href="#/collect-list"></a>
        <ul class="tabs-content">
          <li class="tab-item " v-for="(item, index) in config.parent.arr" v-bind:class="{active: index === config.parent.activeIndex}" >
            <a v-bind:href="item.href">{{ item.name }}</a>
          </li>
        </ul>
        <!--<a class="link-btn icon-portrait" href="#/account-detail"></a>-->
        <a class="link-btn" href="javascript:;"></a>
      </div>
      <!--<iscroll-view ref="scrollView" class="scroll-view sub-tabs-area" :options="{scrollX: true}">-->
        <!--<ul class="tabs">-->
          <!--<li v-for="(item, index) in config.sub.arr" v-bind:class="{active: index === config.sub.activeIndex}">{{ item.cn_name }}</li>-->
        <!--</ul>-->
      <!--</iscroll-view>-->
      <iscroll-view ref="scrollView" class="scroll-view sub-tabs-area" :options="{click: true, scrollX: true}" :scrollerClass="{'scroller':true}"  @scrollEnd="updateX">
          <span :id="'subTab' + index" class="tab-item" v-for="(item, index) in config.sub.arr" v-bind:class="{active: index === config.sub.activeIndex, 'has-not-read-msgs': item.notReadNum > 0}" @click="config.sub.activeIndex = index;selectSubTypeFn(item.en_name, index)">{{ item.cn_name }}</span>
      </iscroll-view>
      <!--<div class=" sub-tabs-area" >-->
        <!--<iscroll-view class="scroll-view tabs"  ref="scrollView" :options="{scrollX: true}">-->
          <!--<li v-for="(item, index) in config.sub.arr" v-bind:class="{active: index === config.sub.activeIndex}">{{ item.cn_name }}</li>-->
        <!--</iscroll-view>-->
      <!--</div>-->
    </div>
</template>
<script>
  export default{
    props: ['name', 'config', 'selectSubTypeFn'],
    data () {
      return {}
    },
    mounted () {
      let pageName = this.$route.name
      let scrollX
      if (pageName === 'marketing-msg-list') {
        scrollX = window.marketingScrollX || 0
      } else {
        scrollX = window.riskScrollX || 0
      }
      this.$refs.scrollView.scrollTo(scrollX, 0)
    },
    methods: {
      updateX () {
        var transform = document.querySelector('.scroller').style.transform
        console.log(transform)
        let tempStr = transform.match(/\(.*\) /g)[0]
        let x = parseInt(tempStr.split(',')[0].replace(/\(/, ''))
        console.log('x:' + x)
        this.$emit('update-X', x)
      }
    }
  }
</script>
<style  lang="scss">
    .parent-tabs-area{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #2178D4;
        height: 45px;
        padding: 0 12px;
        .link-btn{
            display: block;
            background-size: 24px auto;
            width: 24px;
            height: 24px;
        }
        .icon-collect-link{
          background-image: url(../assets/img/collect_star.png);
        }
        .icon-portrait{
            background-image: url(../assets/img/portrait.png);
        }
        .tabs-content{
            display: flex;
            width: 176px;
            justify-content: space-between;
            .tab-item{
              >a{
                 font-size: 18px;
                 color: #fff;
               }
                opacity: .5;
                &.active{
                     opacity: 1;
                 }
            }
        }
    }
    .sub-tabs-area{
      touch-action: none;
      background-color: #fff;
      -webkit-transform:translate3d(0,0,0);
      overflow: hidden;
      >div{
      }

      .scroller, ul.tabs{
        display: inline-block;
        height: 40px;
        align-items: center;
        padding: 0 12px;
        white-space: nowrap;
        .tab-item{
          display: inline-block;
          position: relative;
          height: 100%;
          line-height: 40px;
          margin-right: 18px;
          font-size: 16px;
          color: #666;
          white-space: nowrap;
          &.has-not-read-msgs:before{
            position: absolute;
            right: -5px;
            top: 9px;
            display: block;
            content: '';
            background-color: #FC4239;
            width: 6px;
            height: 6px;
            border-radius: 100%;
          }

          &.active{
            color: #2178D4;
            &:after {
              position: absolute;
              bottom: 0;
              display: block;
              content: '';
              width: 100%;
              height: 3px;
              background: #2178D4;

            }
          }
          &:nth-last-child(1){
            margin-right: 0;
          }

        }
      }
    }
</style>
