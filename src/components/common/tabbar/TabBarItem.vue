<template>
    <div class="tab-bar-item"  @click="changeRoute">
        <div v-if="!isActive"><slot name="icon-item"></slot></div>
        <div v-else><slot name="icon-item-active"></slot></div>
        <div :style="activeStyle"><slot name="text-item"></slot></div>
    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#01FF70'
    }
  },
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    changeRoute () {
      this.$router.push(this.path)
    }
  }
}
</script>

<style>
    .tab-bar-item{
        flex: 1;
        text-align: center;
        font-size: 14px;
        height: 49px;
        }
    .tab-bar-item img{
        width: 24px;
        height: 24px;
        margin-top: 3px;
        vertical-align: middle;
        padding-bottom: 2px;
    }
</style>
