<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" />
      </div>
      <div class="right-content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="arrive">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showInfo">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showInfo">
      <span class="bulletin-img"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="more-info" v-if="infoShow">
        <div class="info-wrapper clearfix">
          <div class="info-main">
            <h1 class="info-name">{{seller.name}}</h1>
            <div class="vstar-wrapper">
              <vstar :size="48" :score="seller.score"></vstar>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li v-for="(item,index) in seller.supports" :key="item.id" class="support-item">
                <span class="item-icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="item-text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="info-close" @click="hideInfo">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import vstar from '../star/star.vue'
export default {
  data () {
    return {
      infoShow: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    showInfo () {
      this.infoShow = true
    },
    hideInfo () {
      this.infoShow = false
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    vstar: vstar
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixi"
@import "../../common/stylus/icon.css"
@import "../../common/stylus/base.styl"
body
  margin: 0
  padding: 0
  font-weight: 200
  .header
    position: relative
    color: #fff
    background: rgba(7,17,27,0.5)
    overflow: hidden
    .header-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
        border-radius: 2px
      .right-content
        display: inline-block
        font-size: 14px
        margin-left: 16px
        .title
          margin-top: 2px
          margin-bottom: 8px
          .brand
            display: inline-block
            width: 30px
            height: 18px
            bg-img("brand")
            background-size: 30px 18px
            vertical-align: top
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            font-weight: bold
            line-height: 18px
            color: rgb(255, 255, 255)
        .arrive
          font-size: 12px
          color: rgb(255, 255, 255)
          font-weight: 200
          line-height: 12px
          margin-bottom: 10px
        .support
          margin-bottom: 2px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img("decrease_1")
            &.discount
              bg-img("discount_1")
            &.guarantee
              bg-img("guarantee_1")
            &.invoice
              bg-img("invoice_1")
            &.special
              bg-img("special_1")
          .text
            font-size: 10px
            line-height: 12px
      .support-count
        position: absolute
        bottom: 14px
        right: 12px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius :14px
        background-color :rgba(0,0,0,0.2)
        text-align: center
        .count
          font-size :10px
          color :rgb(255,255,255)
          line-height :24px
          margin-right :2px
        .icon-keyboard_arrow_right
          line-height: 12px
          font-size :10px
    .bulletin-wrapper
      position: relative
      height: 28px
      padding : 0 22px 0 12px
      color : rgb(255,255,255)
      font-weight : 200
      line-height : 28px
      white-space : nowrap
      overflow: hidden
      text-overflow : ellipsis
      background-color: rgba(7,17,27,0.2)
      .bulletin-img
        display : inline-block
        width :22px
        height : 12px
        margin-top :8px
        line-height : 28px
        bg-img("bulletin")
        background-size : 22px 12px
        background-repeat : no-repeat
      .bulletin-text
        font-size :10px
        margin : 0 4px
      .icon-keyboard_arrow_right
        position: absolute
        right : 12px
        top: 7px
    .bg
      position : absolute
      top: 0
      left: 0
      width : 100%
      height : 100%
      z-index : -10
      filter :blur(10px)
    .more-info
      position : fixed
      top : 0
      left : 0
      z-index : 100
      width : 100%
      height : 100%
      overflow : auto
      background: rgba(7,17,27,0.8)
      backdrop-filter: blur(10px)
      &.fade-enter
        opacity: 0
        background: rgba(7,17,27,0)
      &.fade-leave
        opacity: 0
        background: rgba(7,17,27,0)
      &.fade-enter-to
        opacity: 1
        background: rgba(7,17,27,0.8)
      &.fade-leave-to
        opacity: 0
        background: rgba(7,17,27,0)
      &.fade-enter-active
        transition: all 0.5s
      &.fade-leave-active
        transition: all 0.5s
      .info-wrapper
        width : 100%
        height : auto
        min-height :100%
        .info-main
          padding-bottom : 64px
          .info-name
            font-size : 16px
            font-weight : 700
            color : rgb(255,255,255)
            line-height : 16px
            text-align : center
            margin : 64px auto 16px auto
          .vstar-wrapper
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -7px
              border-bottom: 1px solid rgba(255,255,255,0.2)
            .text
              padding: 0 12px
              font-weight: 700
              font-size: 14px
              line-height: 14px
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              font-size: 0
              padding: 0 12px
              margin-bottom: 12px
              &:last-child
                margin-bottom: 0
              .item-icon
                display: inline-block
                width: 16px
                height: 16px
                margin-right: 6px
                vertical-align: top
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-img("decrease_1")
                &.discount
                  bg-img("discount_1")
                &.guarantee
                  bg-img("guarantee_1")
                &.invoice
                  bg-img("invoice_1")
                &.special
                  bg-img("special_1")
              .item-text
                font-size: 12px
                font-weight: 200
                line-height: 16px
          .bulletin
            width: 80%
            margin: auto
            .content
              font-size: 12px
              font-weight: 200
              line-height: 24px
      .info-close
        position: relative
        width: 32px
        height : 32px
        margin: -128px auto 0 auto
        clear: both
        font-size: 32px
</style>
