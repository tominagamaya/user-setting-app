import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Setting from '@/components/Setting'
import Help from '@/components/Help'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    }
  ]
})
