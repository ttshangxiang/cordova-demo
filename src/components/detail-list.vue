<template>
  <div class="list-content">
    <div class="title">企业名称</div>
    <ul class="company-list">
      <li class="item" v-for="item in list">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default{
    props: ['list']
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .list-content{
    .title{
      padding: 10px 0 8px 0;
      border-bottom: 1px solid #EFEFEF;
      font-size: 14px;
      color: #999999;
    }
    .company-list{
      .item{
        padding: 18px 0;
        border-bottom: 1px solid #EFEFEF;
        font-size: 13px;
        color: #333333;
      }
    }

  }
</style>
