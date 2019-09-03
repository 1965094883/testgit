<template>
  <div class="shopcontrol">
    <transition name="move">
    <div class="decrease" v-show="food.count > 0" @click="delfood" @click.stop>
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    </transition>
    <div class="foodcount" v-show="food.count > 0">{{food.count}}</div>
    <div class="add icon-add_circle" @click="addfood($event)" @click.stop></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addfood () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    delfood () {
      this.food.count--
    }
  }
}
</script>
<style lang="stylus">
@import "../../common/stylus/icon.css"
  .shopcontrol
    font-size: 0
    .decrease
      display: inline-block
      color: rgb(0,160,220)
      vertical-align: top
      padding: 6px
      line-height: 24px
      font-size: 24px
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
      &.move-enter
        opacity: 0
        transform: translate3D(48px, 0, 0)
        .inner
          transform: rotate(0)
      &.move-leave,&.move-enter-to
        opacity: 1
        transform: translate3D(0, 0, 0)
        .inner
          transform: rotate(180deg)
      &.move-leave-to
        opacity: 0
        transform: translate3D(48px, 0, 0)
        .inner
          transform: rotate(-180deg)
      &.move-leave-active,&.move-enter-active
        transition: all 0.4s linear
        .inner
          transition: all 0.4s ease
    .foodcount
      display: inline-block
      width: 24px
      padding-top: 6px
      font-size: 10px
      line-height: 24px
      text-align: center
      color: rgb(147,153,159)
    .add
      display: inline-block
      color: rgb(0,160,220)
      padding: 6px
      line-height: 24px
      font-size: 24px
      vertical-align: top
</style>
