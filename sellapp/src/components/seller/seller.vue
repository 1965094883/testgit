<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="seller-wrapper">
        <h1 class="sellername maintitle">{{seller.name}}</h1>
        <star :size="36" :score="seller.score"></star>
        <span class="ratingCount">({{seller.ratingCount}})</span>
        <span class="sellCount">月售{{seller.sellCount}}单</span>
        <div class="collect">
          <span class="icon-favorite" @click="collect" :class="{'hascollect':this.hascollect}"></span>
          <span class="txt" v-html=collectText></span>
          </div>
      </div>
      <div class="transport">
        <div class="minPrice"><div class="tran-text">起送价</div>{{seller.minPrice}}<span>元</span></div>
        <div class="deliveryPrice"><div class="tran-text">商家配送</div>{{seller.deliveryPrice}}<span>元</span></div>
        <div class="deliveryTime"><div class="tran-text">平均配送时间</div>{{seller.deliveryTime}}<span>分钟</span></div>
      </div>
      <split></split>
      <div class="supports">
        <h2 class="supports-title maintitle">公告与活动</h2>
        <p class="bulletin">{{seller.bulletin}}</p>
        <ul>
          <li class="surpport-list" v-for="(item,index) in seller.supports" :key="index">
            <span class="item-icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="item-text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="seller-photo">
        <h2 class="img-title maintitle">商家实景</h2>
        <div class="pics-wrapper" ref="picsWrapper">
          <ul ref="picsList">
            <li class="pic-list"><img class="pic-item" v-for="(img, ind) in seller.pics" :key="ind" :src="img"></li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-info">
        <h2 class="info-title maintitle">商家信息</h2>
        <p class="info-list" v-for="(info, index) in seller.infos" :key="index">{{info}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {addToLocal, getFromLocal} from '../../common/js/store.js'
import Bscroll from 'better-scroll'
import star from '../star/star.vue'
import shopcar from '../shopcar/shopcar.vue'
import split from '../split/split'

const ERR_OK = 0

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      hascollect: (() => {
        let getcollect = getFromLocal(this.seller.id, 'favorite', false)
        return getcollect
      })()
    }
  },
  components: {
    star,
    shopcar,
    split
  },
  created () {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data)
        this.$nextTick(() => {
          this.scroll1 = new Bscroll(this.$refs.seller, {
            click: true
          })
          if (this.seller.pics) {
            let picsWidth = 120
            let margin = 6
            let width = (picsWidth + margin) * this.seller.pics.length - margin
            this.$refs.picsList.style.width = width + 'px'
            this.$nextTick(() => {
              this.scroll2 = new Bscroll(this.$refs.picsWrapper, {
                scrollX: true
              })
            })
          }
        })
      }
    })
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  computed: {
    collectText () {
      return this.hascollect ? '已收藏' : '收藏'
    }
  },
  methods: {
    collect () {
      this.hascollect = !this.hascollect
      addToLocal(this.seller.id, 'favorite', this.hascollect)
    }
  }
}
</script>
<style lang="stylus"  rel="stylesheet/stylus">
@import "../../common/stylus/mixi.styl"
@import "../../common/stylus/icon.css"
  .seller
    position: absolute
    top: 174px
    bottom: 10px
    left: 0
    width: 100%
    overflow: hidden
    .seller-content
      .maintitle
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
        line-height: 14px
      .seller-wrapper
        position: relative
        margin: 0 18px
        padding: 18px 0
        font-size: 0
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .sellername
          font-size: 14px
          color: rgb(7,17,27)
          line-height:14px
          font-weight: 700
          margin-bottom: 8px
        .star
          display: inline-block
          margin-right: 8px
          vertical-align:top
        .ratingCount,.sellCount
          vertical-align:top
          font-size: 10px
          color: rgb(77,85,93)
          line-height: 18px
          margin-right: 12px
        .collect
          position: absolute
          right: 0
          bottom: 18px
          width: 36px
          text-align: center
          .icon-favorite
            font-size: 24px
            line-height: 24px
            color: #d4d6d9
            display: block
            margin-bottom: 4px
            &.hascollect
              color: rgb(240,20,20)
          .txt
            font-size: 10px
            line-height: 10px
      .transport
        margin: 0 18px
        display: flex
        .deliveryPrice
          border-left: 1px solid rgba(7,17,27,0.1)
          border-right: 1px solid rgba(7,17,27,0.1)
        .minPrice,.deliveryPrice,.deliveryTime
          display: inline-block
          margin: 18px 0
          flex: 1
          text-align: center
          font-size: 24px
          line-height: 24px
          font-weight: 300
          .tran-text
            font-size: 10px
            color: rgb(147,153,159)
            line-height: 10px
            margin-bottom: 4px
        span
          font-size: 10px
          font-weight: 200
          color: rgb(7,17,27)
      .supports
        margin: 18px 18px 0 18px
        .supports-title
          margin-bottom: 8px
        .bulletin
          margin-bottom: 16px
          padding: 0 12px
          font-size: 12px
          font-weight: 200
          color: rgb(240,20,20)
          line-height: 24px
        .surpport-list
          border-top: 1px solid rgba(7,17,27,0.1)
          padding: 16px 12px
          font-size: 0
          .item-icon
            display: inline-block
            width: 16px
            height: 16px
            margin-right: 2px
            background-size: 16px 16px
            background-repeat: no-repeat
            vertical-align: top
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
            color: rgb(7,17,27)
            line-height: 16px
      .seller-photo
        padding:18px
        .img-title
          margin-bottom: 12px
        .pics-wrapper
          overflow: hidden
          width: 100%
          white-space: nowrap
          .pic-list
            font-size: 0
            .pic-item
              display: inline-block
              width: 120px
              height: 90px
              margin-right: 6px
              &:last-child
                margin: 0
      .seller-info
        margin: 0 18px
        .info-title
          padding: 18px 0 12px 0
        .info-list
          padding: 16px 12px
          font-size: 12px
          font-weight: 200
          color: rgb(7,17,27)
          line-height: 16px
          border-top: 1px solid rgba(7,17,27,0.1)
</style>
