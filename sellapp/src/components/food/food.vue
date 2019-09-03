<template>
  <transition name="foodinfo">
    <div v-show="showFlag" class="food" ref="foodcontent">
      <div class="info-content">
        <div class="img-header">
          <img :src="foo.image">
          <div class="back" @click="hiddeninfo">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{foo.name}}</h1>
          <div class="sell-info">
            <span class="sell-count">月售{{foo.sellCount}}份</span>
            <span class="sell-rating">好评率{{foo.rating}}%</span>
          </div>
          <div class="sell-price">
            ￥<span class="newPrice">{{foo.price}}</span>
            <span class="oldPrice" v-show="foo.oldPrice">￥{{foo.oldPrice}}</span>
          </div>
          <div class="shopc">
            <div class="addtocar" @click="addFirst" v-show="!foo.count || foo.count === 0">加入购物车</div>
          </div>
          <div class="shopcont" v-show="foo.count>0"><shopcontrol :food="foo"></shopcontrol></div>
        </div>
        <split v-show="foo.info"></split>
        <div class="desc" v-show="foo.info">
          <h1 class="desc-title">商品介绍</h1>
          <p class="desc-info">{{foo.info}}</p>
        </div>
        <split></split>
        <div class="ratings">
          <h1 class="rating-title">商品评价</h1>
          <ratingselect @togglecontent="togglecontent" @ratingtype="ratingtype" :ratings="foo.ratings" :desc="desc" :hascontent="hascontent" :selectType="selectType"></ratingselect>
          <div class="list-wrapper">
            <ul v-show="foo.ratings && foo.ratings.length">
              <li v-show="needshow(item.rateType, item.text)" class="itemlist" v-for="(item,index) in foo.ratings" :key="index">
                <div class="user">
                  <span class="username">{{item.username}}</span>
                  <img :src="item.avatar" width="12" height="12">
                </div>
                <div class="rateTime">{{item.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':item.rateType === 0,'icon-thumb_down':item.rateType === 1}"></span>
                  {{item.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!foo.ratings || !foo.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import {formatDate} from '../../common/js/date.js'
import Bscroll from 'better-scroll'
import shopcontrol from '../shopControl/shopcontrol.vue'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'

const ALL = 2

export default {
  data () {
    return {
      showFlag: false,
      desc: {
        all: '全部',
        rec: '推荐',
        bad: '吐槽'
      },
      selectType: ALL,
      hascontent: false,
      ratings: {
        type: Array
      }
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    shopcontrol,
    split,
    ratingselect
  },
  props: {
    foo: {
      type: Object
    }
  },
  methods: {
    needshow (type, text) {
      if (this.hascontent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return this.selectType === type
      }
    },
    togglecontent (only) {
      this.hascontent = only
      this.$nextTick(() => {
        this.inScroll.refresh()
      })
    },
    ratingtype (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.inScroll.refresh()
      })
    },
    show () {
      this.showFlag = true
      this.selectType = ALL
      this.hascontent = true
      this.$nextTick(() => {
        if (!this.inScroll) {
          this.inScroll = new Bscroll(this.$refs.foodcontent, {
            click: true
          })
        } else {
          this.inScroll.refresh()
        }
      })
    },
    hiddeninfo () {
      this.showFlag = false
    },
    addFirst () {
      Vue.set(this.foo, 'count', 1)
    }
  }
}
</script>
<style lang="stylus">
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    background: #fff
    &.foodinfo-enter,&.foodinfo-leave-to
      transform: translate3D(-100%, 0, 0)
    &.foodinfo-leave,&.foodinfo-enter-to
      transform: translate3D(0, 0, 0)
    &.foodinfo-leave-active,&.foodinfo-enter-active
      transition: all 0.3s
    .img-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: fixed
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          font-size: 20px
          padding: 10px
          color: #fff
    .content
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
        line-height: 14px
      .sell-info
        font-size: 0
        .sell-count,.sell-rating
          display: inline-block
          font-size: 10px
          color: rgb(147,153,159)
          line-height: 10px
        .sell-rating
          margin-left: 12px
      .sell-price
        margin-top: 18px
        font-size: 10px
        color: rgb(240,20,20)
        .newPrice
          line-height: 24px
          font-size: 14px
          font-weight: 700
        .oldPrice
          margin-left: 6px
          color: rgb(147,153,159)
          line-height: 24px
          font-size: 10px
          font-weight: 700
          text-decoration: line-through
      .shopc
        position: absolute
        right: 18px
        bottom: 18px
        display: inline-block
        width: 74px
        height: 24px
        .addtocar
          background: rgb(0,160,220)
          border-radius: 12px
          font-size: 10px
          color: rgb(255,255,255)
          line-height: 24px
          text-align: center
      .shopcont
        position: absolute
        bottom: 12px
        right: 12px
    .desc
      padding: 18px
      .desc-info
        font-size: 12px
        font-weight: 200
        color: rgb(77,85,93)
        line-height: 24px
        padding: 6px 8px
    .ratings
      .rating-title
        margin-top: 18px
        margin-bottom: 6px
        margin-left: 18px
      .list-wrapper
        margin: 0 18px
        .itemlist
          position: relative
          padding: 16px 0
          border-bottom: 1px solid rgba(7,17,27,0.1)
          .user
            position: absolute
            right: 0
            top: 16px
            font-size: 0
            .username
              margin-right: 6px
              font-size: 10px
              line-height: 12px
              color: rgb(147,153,159)
              vertical-align: top
          .rateTime
            margin-bottom: 6px
            font-size: 10px
            line-height: 12px
            color: rgb(147,153,159)
          .text
            font-size: 12px
            line-height: 16px
            color: rgb(7,17,27)
            .icon-thumb_up,.icon-thumb_down
              font-size: 12px
              line-height: 16px
              color: rgb(147,153,159)
              margin-right: 4px
            .icon-thumb_up
              color: rgb(0,160,220)
        .no-rating
          font-size: 12px
          padding: 16px 0
          color: rgb(147,153,159)
</style>
