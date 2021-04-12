import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/view/home/index');
const collegeManage = () => import('@/view/collegeManage/index');

Vue.use(Router)
const routes = [{
    path: '/',
    component: () => import('@/view/login/index')
  },
  {
    path: '/home',
    component: Home,
    name: '',
    children: [{
      path: '',
      component: collegeManage,
      meta: [],
    }, {
      path: '/collegeManage',
      component: collegeManage,
      meta: ['管理员', '院校管理'],
    }, ]
  },
]

export default new Router({
  routes,
})
