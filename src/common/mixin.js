import { debounce } from 'common/utils'

export const backTopMixin = {
  data: function () {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }
}

export const imgLoadRefresh = {
  data: function () {
    return {
      imgListener: null
    }
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.imgListener = () => {
      refresh()
    }
    this.$bus.$on('imageLoaded', () => {
      this.imgListener()
    })
  },
  destroyed () {
    this.$bus.$off('imageLoaded', () => {
      this.imgListener()
    })
  }
}
