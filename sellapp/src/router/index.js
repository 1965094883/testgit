import Vue from 'vue'
import Router from 'vue-router'
import seller from '../components/seller/seller.vue'
import goods from '../components/goods/goods.vue'
import ratings from '../components/ratings/ratings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      components: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      components: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      components: seller
    }
  ]
})
