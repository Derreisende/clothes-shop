<template>
  <div id="category">
      <nav-bar class="nav-bar">
          <div slot="center">商品分类</div>
      </nav-bar>
      <div class="content">
          <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
          <scroll id="tab-content" ref="scroll" :data="[categoryData]">
            <div>
              <tab-content-category :subcategories="showSubcategory"></tab-content-category>
              <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"></tab-control>
              <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
            </div>
          </scroll>
      </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childComps/TabMenu.vue'
import TabContentCategory from './childComps/TabContentCategory.vue'
import TabContentDetail from './childComps/TabContentDetail.vue'
import TabControl from 'components/content/tabControl/TabControl'

import Scroll from 'components/common/scroll/Scroll'
import { getCategory, getSubcategory, getCategoryDetail } from 'network/category'
import { POP, SELL, NEW } from 'common/const'
import { imgLoadRefresh } from 'common/mixin'
export default {
  name: 'category',
  components: {
    NavBar,
    TabContentCategory,
    TabMenu,
    TabContentDetail,
    TabControl,
    Scroll
  },
  mixins: [imgLoadRefresh],
  data: function () {
    return {
      categories: [],
      categoryData: {
      },
      currentIndex: -1,
      currentType: POP
    }
  },
  created () {
    // 1.请求分类数据
    this._getCategory()
  },
  computed: {
    showSubcategory () {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail () {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    tabClick: function (index) {
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
    },
    _getCategory () {
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.data.category.list
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories (index) {
      this.currentIndex = index
      const mailKey = this.categories[index].maitKey
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data.data
        this.categoryData = { ...this.categoryData }
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
    },
    _getCategoryDetail (type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res.data
        this.categoryData = { ...this.categoryData }
      })
    },
    /**
* 事件响应相关的方法
*/
    selectItem (index) {
      this._getSubcategories(index)
    }
  }
}
</script>

<style scoped>
  #category {
    height: 100vh;
    width: 100%;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .content {
    position: absolute;
    width: 100%;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  #tab-content {
    height: 100%;
    flex: 1;
    width: 0;
  }
</style>
