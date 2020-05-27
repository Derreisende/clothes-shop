<template>
    <div class="recommend-info">
      <div class="info-header">热门推荐</div>
      <div class="recommend-list">
        <goods-list-item  v-for="(item, index) in recommendList" :key="index" :goodsItem="item"></goods-list-item>
        </div>
    </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'
export default {
  name: 'DetailRecommendInfo',
  components: {
    GoodsListItem
  },
  props: {
    recommendList: {
      type: Array
    }
  }
}
</script>

<style scoped>
    .recommend-info {
      padding: 5px;
    }
    .info-header {
      font-size: 15px;
      color: #333;
      text-align: center;
    }
    .recommend-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    }
</style>
