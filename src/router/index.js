import Vue from 'vue'
import Router from 'vue-router'

const   Home = ()=> import('@/view/home/index');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/view/login/index')
    },
    {
      path: '/home',
      component: Home,
      name: '',
      // children: [{
      //   path: '',
      //   component: home,
      //   meta: [],
      // },{
      //   path: '/addShop',
      //   component: addShop,
      //   meta: ['添加数据', '添加商铺'],
      // },{
      //   path: '/addGoods',
      //   component: addGoods,
      //   meta: ['添加数据', '添加商品'],
      // },{
      //   path: '/userList',
      //   component: userList,
      //   meta: ['数据管理', '用户列表'],
      // },{
      //   path: '/shopList',
      //   component: shopList,
      //   meta: ['数据管理', '商家列表'],
      // },{
      //   path: '/foodList',
      //   component: foodList,
      //   meta: ['数据管理', '食品列表'],
      // },{
      //   path: '/orderList',
      //   component: orderList,
      //   meta: ['数据管理', '订单列表'],
      // },{
      //   path: '/adminList',
      //   component: adminList,
      //   meta: ['数据管理', '管理员列表'],
      // },{
      //   path: '/visitor',
      //   component: visitor,
      //   meta: ['图表', '用户分布'],
      // },{
      //   path: '/newMember',
      //   component: newMember,
      //   meta: ['图表', '用户数据'],
      // },{
      //   path: '/uploadImg',
      //   component: uploadImg,
      //   meta: ['文本编辑', 'MarkDown'],
      // },{
      //   path: '/vueEdit',
      //   component: vueEdit,
      //   meta: ['编辑', '文本编辑'],
      // },{
      //   path: '/adminSet',
      //   component: adminSet,
      //   meta: ['设置', '管理员设置'],
      // },{
      //   path: '/sendMessage',
      //   component: sendMessage,
      //   meta: ['设置', '发送通知'],
      // },{
      //   path: '/explain',
      //   component: explain,
      //   meta: ['说明', '说明'],
      // }]
    }
  ]
})
