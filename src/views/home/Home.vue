<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control class="tab-control2" :titles="['流行','新款','精选']" @tabClick="changeIndex"
         ref="tabControl2" v-show="isFixed"/>
        <scroll class="scroll-content" ref="scroll" :probeType="3" :listenScroll="true" @scroll="hideBack"
        :pullUpLoad="true" @pullingUp="loadMore" :click="true">
        <home-swiper :banners="banners" @swiperImgLoad="swiperLoad" ref="hSwiper"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view/>
       <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="changeIndex" ref="tabControl"/>
       <goods-list :goodslist="showList"></goods-list>
       </scroll>
       <back-top @click.native="backTop" v-show="showBackTop"></back-top>
    </div>
</template>

<script>
import HomeSwiper from './childrenComps/HomeSwiper.vue'
import RecommendView from './childrenComps/RecommendView.vue'
import FeatureView from './childrenComps/FeatureView.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { backTopMixin, imgLoadRefresh } from '@/common/mixin'
import { NEW, POP, SELL, BACKTOP_DISTANCE } from 'common/const'
export default {
  name: 'home',
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isFixed: false,
      tabOffsetTop: 0,
      saveY: 0
    }
  },
  mixins: [backTopMixin, imgLoadRefresh],
  computed: {
    showList () {
      return this.goods[this.currentType].list
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    BackTop,
    Scroll,
    TabControl,
    NavBar
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.hSwiper.startTimer()
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()
    this.$refs.hSwiper.stopTimer()
  },
  created () {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  updated () {
    this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
  },
  methods: {
    changeIndex: function (index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    /* 上拉加载数据 */
    loadMore: function () {
      this.getHomeGoods(this.currentType)
    },
    // 轮播图加载完，给tabControl赋值offsetTop
    swiperLoad: function () {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    /* 是否隐藏backtop按钮 */
    hideBack: function (pos) {
      this.showBackTop = (-pos.y) > BACKTOP_DISTANCE
      // 决定tabCtrol是否吸顶
      this.isFixed = (-pos.y) > this.tabOffsetTop
    },
    /*
    网络请求相关方法
    */
    getHomeMultidata: function () {
      // 请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
        // 下次更新DOM时,获取新的tabOffsetTop值(不保险,可以在updated钩子中获取)
      //    this.$nextTick(() => {
      //    this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      })
    },
    getHomeGoods: function (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
    #home{
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;
    }
    .scroll-content{
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
        overflow: hidden;
    }
    /* .content{
        width: 100vw;
        overflow: hidden;
        height: calc(100% - 93px);
        margin-top: 44px;
    } */
    .tab-control2{
        position: fixed;
        top: 44px;
        left: 0;
        right: 0;
        z-index: 9;
    }
</style>
