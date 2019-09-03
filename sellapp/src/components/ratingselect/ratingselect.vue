<template>
  <div class="rating-wrapper">
    <div class="rating-type">
      <div class="block rate-all" @click="changeType(2)" :class="{'active': selectType === 2}">{{desc.all}}<span class="rate-count">{{ratings.length}}</span></div>
      <div class="block rate-rec" @click="changeType(0)" :class="{'active': selectType === 0}">{{desc.rec}}<span class="rate-count">{{rec.length}}</span></div>
      <div class="block rate-bad" @click="changeType(1)" :class="{'active': selectType === 1}">{{desc.bad}}<span class="rate-count">{{bad.length}}</span></div>
    </div>
    <div class="hascontent" :class="{'on':hascontent}">
      <i class="icon-check_circle" @click="iscontent"></i>
      <span class="text">{{ratings.username}}只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const ALL = 2
const REC = 0
const BAD = 1

export default {
  props: {
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          rec: '满意',
          bad: '不满意'
        }
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    hascontent: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    changeType (type) {
      this.selectType = type
      this.$emit('ratingtype', type)
    },
    iscontent () {
      this.hascontent = !this.hascontent
      this.$emit('togglecontent', this.hascontent)
    }
  },
  computed: {
    rec () {
      return this.ratings.filter((ratings) => {
        return ratings.rateType === REC
      })
    },
    bad () {
      return this.ratings.filter((ratings) => {
        return ratings.rateType === BAD
      })
    }
  }
}
</script>
<style lang="stylus">
  .rating-type
    margin: 12px 18px 0
    padding-bottom: 18px
    font-size: 0px
    border-bottom: 1px solid rgba(7,17,27,0.1)
    .block
      display: inline-block
      padding: 8px 12px
      margin-right: 8px
      line-height: 16px
      border-radius: 1px
      font-size: 12px
      .rate-count
        margin-left: 4px
        font-size: 8px
      &.rate-all
        background: rgba(0,160,220,0.2)
        &.active
          color: #fff
          background: rgb(0,160,220)
      &.rate-rec
        background: rgba(0,160,220,0.2)
        &.active
          color: #fff
          background: rgb(0,160,220)
      &.rate-bad
        background: rgba(77,85,93,0.2)
        &.active
          color: #fff
          background: rgb(77,85,93)
  .hascontent
    padding: 12px 18px
    font-size: 12px
    color: rgb(147,153,159)
    line-height: 24px
    border-bottom: 1px solid rgba(7,17,27,0.1)
    &.on
      .icon-check_circle
        color: #00c850
    .icon-check_circle
      margin-right: 4px
      font-size: 24px
      line-height: 24px
    .text
      vertical-align: top
</style>
