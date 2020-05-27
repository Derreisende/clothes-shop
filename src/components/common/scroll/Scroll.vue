<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    /**
           * 1 滚动的时候会派发scroll事件，会截流。
           * 2 滚动的时候实时派发scroll事件，不会截流。
           * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
           */
    probeType: {
      type: Number,
      default: 1
    },
    /**
           * 点击列表是否派发click事件
           */
    click: {
      type: Boolean,
      default: true
    },
    /**
           * 是否开启横向滚动
           */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
           * 是否派发滚动事件
           */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
           * 列表的数据
           */
    data: {
      type: Array,
      default: null
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted () {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX
      })

      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
      // 3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    },
    refresh () {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }

}
</script>

<style>
</style>
