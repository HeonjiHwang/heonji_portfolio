import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld')
    },
    {
      path: '/board/list',
      name: 'List',
      component: () => import('@/components/board/List')
    },
    {
      path: '/board/write',
      name: 'Write',
      component: () => import('@/components/board/Write')
    },
    {
      path: '/board/view',
      name: 'View',
      component: () => import('@/components/board/View')
    },
    {
      path: '/test/test',
      name: 'Test',
      component: () => import('@/components/test/Test')
    },
    {
      path: '/vuex/example',
      name: 'Example',
      component: () => import('@/components/vuex/Example')
    }
  ]
})
