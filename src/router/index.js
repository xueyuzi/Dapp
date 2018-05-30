import Vue from 'vue'
import Router from 'vue-router'
import commodityList from '@/router/commodityList'
import commodityDetal from "@/router/commodityDetal"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: commodityList
    },
    {
      path:"/detal",
      component:commodityDetal,
      props: route => route.query
    }
  ]
})
