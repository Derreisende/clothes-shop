<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="titleClick" :current-index="currentIndex"/>
    <detail-add-cart v-show="isAddCart"/>
    <scroll class="content" ref="scroll" :probeType="3" :listenScroll="true"
    :data="[topImages, goods, shop, detailInfo, paramInfo, commentInfo, recommendList]"
     @scroll="contentScroll"
    >
      <detail-swiper ref="base" :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" class="back-top" v-show="showBackTop">
        <img src="~assets/img/common/top.png" alt="">
    </back-top>
  </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailRecommendInfo from './childComps/DetailRecommendInfo.vue'
import DetailAddCart from './childComps/DetailAddCart.vue'

import DetailBottomBar from './childComps/DetailBottomBar'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail'
import { backTopMixin, imgLoadRefresh } from 'common/mixin'
import { BACKTOP_DISTANCE } from 'common/const'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    DetailAddCart,
    Scroll,
    BackTop
  },
  mixins: [backTopMixin, imgLoadRefresh],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      recommendList: [],
      commentInfo: {},
      currentIndex: 0,
      themeTops: [],
      imgListener: null,
      isAddCart: false
    }
  },
  created () {
    this._getDetailData()
    // 请求推荐数据
    this._getRecommend()
  },
  mounted () {
    this._getOffsetTop()
  },
  updated () {
    // 获取需要的四个offsetTop
    this._getOffsetTop()
  },
  methods: {
    _getOffsetTop () {
      this.themeTops = []
      this.themeTops.push(this.$refs.base.$el.offsetTop)
      this.themeTops.push(this.$refs.param.$el.offsetTop)
      this.themeTops.push(this.$refs.comment.$el.offsetTop)
      this.themeTops.push(this.$refs.recommend.$el.offsetTop)
      this.themeTops.push(Number.MAX_VALUE)
    },
    contentScroll (position) {
    // 1.监听backTop的显示
      this.showBackTop = (-position.y) > BACKTOP_DISTANCE
      // 2.监听滚动到哪一个主题
      this._listenScrollTheme(-position.y)
    },
    _listenScrollTheme (position) {
      for (let i = 0; i < this.themeTops.length; i++) {
        if (position >= this.themeTops[i] && position < this.themeTops[i + 1]) {
          if (this.currentIndex !== i) {
            this.currentIndex = i
          }
          break
        }
      }
    },
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 50)
    },
    _getDetailData () {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        const data = res.data.result
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
    },
    _getRecommend () {
      getRecommend().then((res, error) => {
        if (error) return
        this.recommendList = res.data.data.list
      })
    },
    // 添加购物车
    addToCart () {
      // 1.创建对象
      const obj = {}
      // 2.对象信息
      obj.iid = this.iid
      obj.imgURL = this.topImages[0]
      obj.title = this.goods.title
      obj.desc = this.goods.desc
      obj.newPrice = this.goods.newPrice
      // 3.添加到Store中
      this.$store.commit('addCart', obj)
      this.isAddCart = true
      window.setTimeout(() => {
        this.isAddCart = false
      }, 800)
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    overflow: hidden;
    width: 100%;
  }
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
</style>
