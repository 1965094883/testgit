<template>
  <div class="ratings" ref="rating">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="scoreNum">{{seller.serviceScore}}</span></div>
          <div class="score-wrapper second">
            <span class="title">商品评价</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="scoreNum">{{seller.foodScore}}</span></div>
          <div class="score-wrapper">
            <span class="title">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span></div>
        </div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings" :hascontent="hascontent" :selectType="selectType" @togglecontent="togglecontent" @ratingtype="ratingtype"></ratingselect>
      <div class="ratings-wrapper">
        <ul>
          <li v-show="needshow(rating.rateType, rating.text)" class="ratinglist" v-for="(rating, index) in ratings" :key="index">
            <div class="avatar"><img :src="rating.avatar" width="28" height="28"></div>
            <div class="rating-content">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <star :size="36" :score="rating.score"></star>
                <span class="delivery">{{rating.deliveryTime}}分钟到达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="rec-list" v-for="(rec, index) in rating.recommend" :key="index">{{rec}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
import {formatDate} from '../../common/js/date.js'
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'

const ALL = 2
const ERR_OK = 0

export default {
  props: {
    seller: {
      type: Object
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      selectType: ALL,
      hascontent: true,
      ratings: []
    }
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          this.rscroll = new Bscroll(this.$refs.rating, {
            click: true
          })
        })
      }
    })
  },
  components: {
    star,
    split,
    ratingselect
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
        this.rscroll.refresh()
      })
    },
    ratingtype (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.rscroll.refresh()
      })
    }
  }
}
</script>
<style lang="stylus">
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        text-align: center
        border-right: 1px solid rgba(7,17,27,0.1)
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          font-size: 24px
          line-height: 28px
          color: rgb(255,153,0)
        .title
          font-size: 12px
          line-height: 12px
          color: rgb(7,17,27)
          margin-top: 6px
        .rank
          margin: 8px 0 6px
          font-size: 10px
          line-height: 10px
          color: rgb(147,153,159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .second
          margin: 8px 0
        .score-wrapper
          font-size: 0
          .title
            display: inline-block
            vertical-align:top
            margin-right: 12px
            font-size: 12px
            line-height: 18px
            font-weight: 700
            color: rgb(7,17,27)
          .star
            display: inline-block
            margin-right: 12px
            vertical-align:top
            @media only screen and (max-width: 320px)
              margin-right: 6px
          .scoreNum
            display: inline-block
            vertical-align:top
            font-size: 12px
            color: rgb(255,153,0)
            line-height: 18px
          .deliveryTime
            font-size: 12px
            color: rgb(147,153,159)
            line-height: 18px
    .ratings-wrapper
      padding: 0 18px
      .ratinglist
        padding: 18px 0
        display: flex
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .avatar
          display: inline-block
          width: 28px
          flex: 0 0 28px
          margin-right: 12px
          img
            border-radius: 50%
        .rating-content
          flex: 1
          position: relative
          font-size: 0
          .name
            display: block
            font-size: 10px
            color: rgb(7,17,27)
            line-height: 12px
          .star-wrapper
            margin: 4px 6px 6px 0
            .star
              display: inline-block
              vertical-align: top
          .delivery
            display: inline-block
            margin: 4px 0 6px
            font-size: 10px
            font-weight: 200
            color: rgb(147,153,159)
            line-height: 12px
            vertical-align: top
          .text
            font-size: 12px
            color: rgb(7,17,27)
            line-height: 18px
            margin-bottom: 8px
          .time
            display: inline-block
            position: absolute
            top: 0
            right: 0
            font-size: 10px
            font-weight: 200
            color: rgb(147,153,159)
            line-height: 12px
          .recommend
            font-size：0
            .icon-thumb_up
              font-size: 12px
              color: rgb(0,160,220)
            .rec-list
              display: inline-block
              border: 1px solid rgba(7,17,27,0.1)
              color: rgb(147,153,159)
              background: #fff
              border-radius: 1px
              padding: 0 6px
              font-size: 9px
              margin: 0 8px 4px 0
              line-height: 16px
</style>
