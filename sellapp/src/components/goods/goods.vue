<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="item.id" class="item-list" @click="selectMenu(index)" :class="{'current':currentIndex === index}" >
          <span class="item-text">
            <span class="item-icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" :key="item.id" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food)" v-for="food in item.foods" :key="food.id" class="foods">
              <div class="food-icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="sell-count">
                  <span class="sell">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new-price"><span class="sym">￥</span>{{food.price}}</span>
                  <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
              <div class="shopcontrol-wrapper">
                <shopcontrol :food="food"></shopcontrol>
                </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <keep-alive>
      <shopcar :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcar>
    </keep-alive>
    <food :foo="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import shopcar from '../shopcar/shopcar.vue'
import shopcontrol from '../shopControl/shopcontrol.vue'
import food from '../food/food.vue'

const ERR_OK = 0

export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    shopcar: shopcar,
    shopcontrol: shopcontrol,
    food
  },
  data () {
    return {
      goods: [ ],
      listHeight: [ ],
      scrollY: 0,
      selectedFood: {}
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count > 0) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        this.$nextTick(() => {
          this.mscroll = new Bscroll(this.$refs.menuWrapper, {
            click: true
          })
          this.fscroll = new Bscroll(this.$refs.foodWrapper, {
            click: true,
            probeType: 3
          })
          this._calculateHeight()
          this.fscroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y))
          })
        })
      }
    })
  },
  methods: {
    _calculateHeight () {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu (index) {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let ev = foodList[index]
      this.fscroll.scrollToElement(ev, 300)
    },
    selectFood (food) {
      this.selectedFood = food
      this.$refs.food.show()
    }
  }
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixi"
@import "../../common/stylus/icon.css"
  .goods
    display: flex
    width: 100%
    position: absolute
    top: 177px
    bottom: 46px
    overflow: hidden
    .menu-wrapper
      width: 80px
      flex: 0 0 80px
      background-color: #f3f5f7
      .item-list
        display: table
        width: 56px
        height:54px
        padding: 0 12px
        font-size: 12px
        &.current
          position: relative
          margin-top: -1px
          z-index: 10
          background-color: #fff
          font-weight: 700
          .item-text
            border-bottom: 0px
        .item-icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          line-height: 14px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-img("decrease_3")
          &.discount
            bg-img("discount_3")
          &.guarantee
            bg-img("guarantee_3")
          &.invoice
            bg-img("invoice_3")
          &.special
            bg-img("special_3")
        .item-text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-bottom: 1px solid rgba(7,17,27,0.1)
    .foods-wrapper
      font-size:0
      flex: 1
      .title
        height: 26px
        padding-left: 14px
        font-size: 12px
        line-height: 26px
        color: rgb(147,153,159)
        background-color: #f3f5f7
        border-left: 2px solid #d9dde1
      .foods
        display: flex
        position: relative
        padding: 18px
        border-bottom: 1px solid rgba(7,17,27,0.1)
        &:last-child
          border-bottom: 0px
        .food-icon
          display: inline-block
          width: 57px
          height: 57px
          margin-right: 10px
          vertical-align: top
        .content
          display: inline-block
          .name
            font-size: 14px
            line-height: 14px
            margin-top: 2px
            margin-bottom: 8px
            color: rgb(7,17,27)
          .desc
            margin-bottom: 8px
            font-size: 10px
            line-height: 12px
            color: rgb(147,153,159)
        .sell-count
          margin-bottom: 8px
          font-size: 10px
          line-height: 10px
          color: rgb(147,153,159)
          .sell
            margin-right:12px
        .price
          .new-price
            color: rgb(240,20,20)
            line-height: 24px
            font-size: 14px
            font-weight: 700
          .old-price
            color: rgb(147,153,159)
            line-height: 24px
            font-size: 10px
            font-weight: 700
            text-decoration: line-through
            .sym
              font-size: 10px
              font-weight: normal
        .shopcontrol-wrapper
          position: absolute
          bottom: 12px
          right: 0
</style>
