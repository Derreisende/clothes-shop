<template>
    <tab-bar>
        <tab-bar-item path="/home" activeColor="#d81e06">
            <img slot="icon-item" src="~assets/img/tabbar/首页-shop.svg" alt="首页">
            <img slot="icon-item-active" src="~assets/img/tabbar/首页-shop-active.svg" alt="">
            <div slot="text-item">首页</div>
        </tab-bar-item>
        <tab-bar-item path="/category" activeColor="#d81e06">
            <img slot="icon-item" src="~assets/img/tabbar/类目.2.svg" alt="分类">
            <img slot="icon-item-active" src="~assets/img/tabbar/类目-active.svg" alt="">
            <div slot="text-item">分类</div>
        </tab-bar-item>
        <tab-bar-item path="/cart" activeColor="#d81e06">
            <img slot="icon-item" src="~assets/img/tabbar/购物车.svg" alt="购物车">
            <img slot="icon-item-active" src="~assets/img/tabbar/购物车active.svg" alt="">
            <div slot="text-item">购物车</div>
        </tab-bar-item>
        <tab-bar-item path="/profile" activeColor="#d81e06">
            <img slot="icon-item" src="~assets/img/tabbar/我的.svg" alt="我的">
            <img slot="icon-item-active" src="~assets/img/tabbar/我的active.svg" alt="">
            <div slot="text-item">我的</div>
        </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>
</style>
