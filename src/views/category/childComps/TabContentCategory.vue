<template>
    <div id="tab-content-catagory">
    <div class="item" v-for="(item, index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="">
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
    </div>
</template>

<script>
export default {
  name: 'TabContentCategory',
  props: {
    subcategories: {
      type: Object,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
#tab-content-catagory{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.item {
    text-align: center;
    font-size: 12px;
    width: 48%;
}

.item-img {
 width: 100%;
}

.item-text {
 margin-top: 15px;
}
</style>
