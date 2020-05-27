<template>
  <div class="goods-list-item" @click="toDetail">
      <img v-lazy="getImg" alt="" @load="imageLoad">
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'GoodListItem',
  props: {
    goodsItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    getImg () {
      // 解决image地址来自不同地方
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad: function () {
      this.$bus.$emit('imageLoaded')
    },
    toDetail: function () {
      console.log(this.goodsItem)
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  .goods-list-item{
      box-sizing: border-box;
      width: 48%;
      position: relative;
  }
  .goods-list-item img{
      width: 100%;
      border-radius: 5px;
  }
  .goods-info{
      font-size: 12px;
      bottom: 5px;
      overflow: hidden;
      text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
