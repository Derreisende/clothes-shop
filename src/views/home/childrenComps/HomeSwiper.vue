<template>
    <div>
        <swiper ref="swiper">
            <swiper-item v-for="(item,index) in banners" :key="index">
                <a :href="item.link" >
                    <img :src="item.image" alt="" @load="swiperImgLoad">
                </a>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperImgLoad: function () {
      if (!this.isLoad) {
        this.$emit('swiperImgLoad')
        this.isLoad = true
      }
    },
    startTimer: function () {
      if (this.isLoad === true) {
        this.$refs.swiper.startTimer()
      }
    },
    stopTimer: function () {
      this.$refs.swiper.stopTimer()
    }
  }
}
</script>

<style>
</style>
