<template>
  <div class="header-bar">
    <a class="return-btn" @click="goBack"><i class="icon-return"></i>返回</a>
    <span class="title"><slot>{{title}}</slot></span>
  </div>
</template>
<script>
  export default{
    props: ['title'],
    methods: {
      goBack () {
        window.history.back()
      }
    }

  }
</script>
<style scoped lang="scss">
  .header-bar {
    position: relative;
    background: #2178D4;
    line-height: 44px;
    font-size: 18px;
    color: #fff;
    text-align: center;
    .return-btn {
      position: absolute;
      left: 0;
      display: inlineb-block;
      align-items: center;
      height: 44px;
      line-height: 44px;
      padding-left: 24px;
      margin-left: 10px;
      font-size: 16px;
      color: #fff;
      .icon-return {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        background: url(../assets/img/arrow_return.png) no-repeat center center;
        background-size: 24px auto;
        width: 24px;
        height: 24px;
        margin: auto 0;
      }
    }
  }
</style>
