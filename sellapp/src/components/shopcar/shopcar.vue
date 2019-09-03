<template>
  <div class="shopcar">
    <div class="content">
      <div class="content-left" @click="toggleList">
        <div class="logo-wrapper">
          <div class="logo" :class="{hasfood:totalCount>0}">
            <i class="icon-shopping_cart" :class="{hasfood:totalCount>0}"></i>
          </div>
          <div class="count" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price"  :class="{hasfood:totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click="paymoney">
        <div class="pay" :class="toPay">
          {{needpay}}
        </div>
      </div>
    </div>
    <transition name="list">
      <div class="shoplist" v-show="listShow" >
        <div class="shop-header">
          <h1 class="shop-title">购物车</h1>
          <span class="shop-clear" @click="clearfood">清空</span>
        </div>
        <div class="shop-main" ref="listWrapper">
          <ul>
            <li class="innerfood" v-for="(food,index) in selectFoods" :key="index">
              <span class="list-name">{{food.name}}</span>
              <div class="list-price">
                ￥<span class="price">{{food.price * food.count}}</span>
              </div>
              <div class="change-count"><shopcontrol :food="food"></shopcontrol></div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="bg">
      <div class="background" v-show="listShow" @click="toggleList"></div>
    </transition>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import shopcontrol from '../shopControl/shopcontrol.vue'
export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      fold: true
    }
  },
  components: {
    shopcontrol
  },
  computed: {
    listShow () {
      if (!this.totalCount) {
        return false
      }
      let show = !this.fold
      return show
    },
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    needpay () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差${this.minPrice - this.totalPrice}元起送`
      } else {
        return '去结算'
      }
    },
    toPay () {
      if (this.totalPrice >= this.minPrice) {
        return 'enough'
      } else {
        return 'not-enough'
      }
    }
  },
  methods: {
    paymoney () {
      if (this.totalPrice > this.minPrice) {
        window.alert(`需要支付${this.totalPrice}元`)
      }
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    clearfood () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    }
  },
  watch: {
    selectedFoods (newFoods, oldFoods) {
      if (newFoods.length === 0) {
        this.fold = true
      }
    },
    listShow () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.lScroll) {
            this.lScroll = new Bscroll(this.$refs.listWrapper, {
              click: true
            })
          } else {
            this.lScroll.refresh()
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus">
  .shopcar
    position: fixed
    bottom: 0
    left: 0
    z-index: 50
    width: 100%
    height: 48px
    background-color: gray
    .content
      display:flex
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 18px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            text-align:center
            width: 100%
            height: 100%
            border-radius: 50%
            background: rgba(255,255,255,0.2)
            &.hasfood
              background-color: rgb(0,160,220)
              color: rgb(255,255,255)
            .icon-shopping_cart
              font-size:24px
              line-height: 44px
              color: rgba(255,255,255,0.4)
              &.hasfood
                color: rgb(255,255,255)
          .count
            position: absolute
            top: 0
            right: 0
            display: inline-block
            width: 24px
            height 16px
            font-size: 9px
            font-weight: 700
            line-height: 16px
            border-radius: 12px
            text-align:center
            color: rgb(255,255,255)
            background: rgb(240,20,20)
            box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4)
        .price
          display: inline-block
          vertical-align: top
          box-sizing: border-box
          margin-top: 12px
          padding-right: 12px
          font-size: 16px
          line-height: 24px
          font-weight: 700
          border-right:1px solid rgba(255,255,255,0.2)
          color: rgba(255,255,255,0.4)
          &.hasfood
            color: rgb(255,255,255)
        .desc
          display: inline-block
          vertical-align: top
          margin-top: 12px
          padding-left: 12px
          font-size: 10px
          line-height: 24px
          font-weight: 400
          color: rgba(255,255,255,0.4)
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          font-size: 12px
          font-weight: 700
          line-height: 48px
          text-align: center
          background: rgba(0,0,0,0.2)
          color: rgba(255,255,255,0.4)
          padding: 0 8px 0 8px
          &.not-enough
            background: rgba(0,0,0,0.2)
          &.enough
            background: #00b43c
            color: #ffffff
    .shoplist
      width: 100%
      position: absolute
      bottom: 48px
      left: 0
      z-index: -1
      background: #fff
      &.list-enter
        transform: translate3d(0,100%,0)
      &.list-leave-to
        transform: translate3d(0,100%,0)
      &.list-enter-to
        transform: translate3d(0,0,0)
      &.list-leave
        transform: translate3d(0,0,0)
      &.list-enter-active,&.list-leave-active
        transition: all .5s
      .shop-header
        width: 100%
        height: 40px
        border-bottom: 1px solid rgba(7,17,27,0.1)
        background: #f3f5f7
        .shop-title
          float: left
          font-size: 14px
          padding-left: 18px
          font-weight: 400
          color: rgb(7,17,27)
          line-height: 40px
        .shop-clear
          float: right
          padding-right: 18px
          font-size: 12px
          line-height: 40px
          color: rgb(0,160,220)
      .shop-main
        background: #fff
        max-height: 217px
        overflow: hidden
        .innerfood
          display: block
          position: relative
          height: 48px
          margin: 0 18px
          padding: 12px 0
          border-bottom: 1px solid rgba(7,17,27,0.1)
          .list-name
            display: inline-block
            font-size: 14px
            font-weight: 700
            line-height: 48px
          .list-price
            display: inline-block
            position: absolute
            right: 124px
            bottom: 24px
            font-size: 10px
            font-weight: normal
            color: rgb(240,20,20)
            line-height: 24px
            .price
              font-size: 14px
              font-weight: 700
          .change-count
            display: inline-block
            position: absolute
            right: 18px
            bottom: 6px
            .shopcontrol
              line-height: 48px
              .add,.decrease,.foodcount
                line-height: 36px
    .background
      position : fixed
      top: 0
      left: 0
      width : 100%
      height : 100%
      z-index : -10
      background: rgba(7,17,27,0.6)
      backdrop-filter: blur(10px)
      &.bg-enter
        opacity: 0
        background: rgba(7,17,27,0)
      &.bg-enter-to
        opacity: 1
        background: rgba(7,17,27,0.6)
      &.bg-leave
        opacity: 1
        background: rgba(7,17,27,0.6)
      &.bg-leave-to
        opacity: 0
        background: rgba(7,17,27,0)
      &.bg-enter-active,&.bg-leave-active
        transition: all 0.5s
</style>
