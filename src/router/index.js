import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/view/home/index');
const collegeManage = () => import('@/view/collegeManage/index');
const professional = () => import('@/view/professional');
const colleRecord = () => import('@/view/colleRecord');
const majorRecord = () => import('@/view/majorRecord');
const userCenter = () => import('@/view/userCenter');
const compareCollege = () => import('@/view/compareCollege');
const recommend = () => import('@/view/recommend');

Vue.use(Router)
const routes = [{
  path: '/',
  name: 'login',
  component: () => import('@/view/login/index')
}, {
  path: '/register',
  name: 'register',
  component: () => import('@/view/login/register')
},
{
  path: '/home',
  component: Home,
  name: 'home',
  children: [{
    path: '/recommend',
    component: recommend,
    meta: ['院校推荐'],
  }, {
    path: '',
    component: collegeManage,
    meta: [],
  }, {
    path: '/collegeManage',
    component: collegeManage,
    meta: {
      keepAlive: false
    },
    meta: ['管理员', '院校管理'],
  }, {
    path: '/searchCollege',
    component: collegeManage,
    meta: ['查询院校'],
  }, {
    path: '/professional',
    component: professional,
    meta: ['管理员', '专业管理'],
  }, {
    path: '/searchProfessional',
    component: professional,
    meta: ['查询专业'],
  }, {
    path: '/modifyCollege',
    name: 'modifyCollege',
    meta: {
      keepAlive: false
    },
    component: () => import('@/view/collegeManage/modifyCollege'),
    meta: ['管理员', '院校修改'],
  }, {
    path: '/colleRecord',
    name: 'colleRecord',
    component: colleRecord,
    meta: ['管理员', '院校分数线管理'],
  }, {
    path: '/searchColleRecord',
    name: 'searchColleRecord',
    component: colleRecord,
    meta: ['查询院校分数线'],
  }, {
    path: '/majorRecord',
    name: 'majorRecord',
    meta: {
      keepAlive: false
    },
    component: majorRecord,
    meta: ['管理员', '专业分数线列表管理'],
  }, {
    path: '/searchMajorRecord',
    name: 'searchMajorRecord',
    meta: {
      keepAlive: false
    },
    component: majorRecord,
    meta: ['查询专业分数线'],
  }, {
    path: '/userCenter',
    name: 'userCenter',
    meta: {
      keepAlive: false
    },
    component: userCenter,
    meta: ['管理员', '用户管理'],
  }, {
    path: '/compareCollege',
    name: 'compareCollege',
    meta: {
      keepAlive: false
    },
    component: compareCollege,
    meta: ['院校对比'],
  },
  ]
},
]

export default new Router({
  routes,
})
