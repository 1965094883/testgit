<template>
  <div>
    <vheader :seller="seller"></vheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to='/goods'>商品。</router-link>
        </div>
      <div class="tab-item">
        <router-link to='/ratings'>评价</router-link>
        </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>
        </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vheader from './components/header/header.vue'
import {urlParse} from './common/js/urlParse.js'

const ERR_OK = 0
export default {
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created () {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data)
      }
    })
  },
  components: {
    vheader
  }
}
</script>

<style>
.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7, 17, 27,0.1);
}
.tab-item{
  flex: 1;
  text-align: center;
}
.tab-item a{
  display: block;
  font-size: 14px;
  color: rgb(77,85,93);
}
.tab-item .active{
  color: rgb(240, 20, 20)
}
</style>
