/* eslint-disable */
import Vue from 'vue';
import App from './App';
import Vuerouter from 'vue-router'
import Vueresource from 'vue-resource'
import seller from './components/seller/seller.vue'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'


Vue.config.productionTip = false;
Vue.use(Vuerouter);
Vue.use(Vueresource);

let app=Vue.extend(App);

const routes=[
  {path: '/goods',component:goods},
  {path: '/ratings', component:ratings},
  {path: '/seller',component:seller}
];

const router = new Vuerouter({routes,linkActiveClass:'active',linkExactActiveClass:''});

new Vue({
  router:router,
  render: h => h(App)
}).$mount("#app");

