import Vue from 'vue'
import Router from 'vue-router'
import demo from '@/views/demo'

import routerLost from '@/views/routerLost'
import register from '@/views/register'
import GVRP from '@/views/GVRP'
import aboutUs from '@/views/aboutUs'
import privacyPolicy from '@/views/privacyPolicy'
import businessLicence from '@/views/businessLicence'
import distributor from '@/views/distributor'

import lineDetails from '@/views/lineDetails'
import album from '@/views/album'
import coupon from '@/views/coupon'
import activity from '@/views/activity'

// import comment from '@/views/comment'
// import doubt from '@/views/doubt'
// import doubtDetail from '@/views/doubtDetail'
import departure from '@/views/departure'
// import schedule from '@/views/schedule'
// import travels from '@/views/travels'
// import resource from '@/views/resource'
// import fillOrder from '@/views/fillOrder'
import downApp from '@/views/downApp'
// import selectUser from '@/views/selectUser'
// import editUser from '@/views/editUser'
// import addUser from '@/views/addUser'
// import searchUser from '@/views/searchUser'
// import invoice from '@/views/invoice'
// import specialNeeds from '@/views/specialNeeds'
import visaNotes from '@/views/visaNotes'
import bookNotes from '@/views/bookNotes'
import buyNotes from '@/views/buyNotes'

Vue.use(Router)

export default new Router({
  routes: [{ // 重定向到注册页
      path: '',
      redirect: '/register'
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo,
      meta: {
        title: '测试页'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/GVRP',
      name: 'GVRP',
      component: GVRP,
      meta: {
        title: '牛掰旅游服务协议'
      }
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs,
      meta: {
        title: '广州牛掰旅游科技有限公司'
      }
    },
    {
      path: '/businessLicence',
      name: 'businessLicence',
      component: businessLicence,
      meta: {
        title: '营业执照'
      }
    },
    {
      path: '/distributor',
      name: 'distributor',
      component: distributor,
      meta: {
        title: '升级分销商协议'
      }
    },
    {
      path: '/privacyPolicy',
      name: 'privacyPolicy',
      component: privacyPolicy,
      meta: {
        title: '用户隐私制度'
      }
    },
    {
      path: '/downApp',
      name: 'downApp',
      component: downApp,
      meta: {
        title: '下载App'
      }
    },
    {
      path: '/lineDetails',
      name: 'lineDetails',
      component: lineDetails,
      meta: {
        title: '线路详情'
      }
    },
    {
      path: '/album',
      name: 'album',
      component: album,
      meta: {
        title: '相册'
      }
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: coupon,
      meta: {
        title: '领取优惠券'
      }
    },
    {
      path: '/activity',
      name: 'activity',
      component: activity,
      meta: {
        title: '优惠活动'
      }
    },

    
    // {
    //   path: '/comment',
    //   name: 'comment',
    //   component: comment,
    //   meta: {
    //     title: '点评'
    //   }
    // },
    // {
    //   path: '/doubt',
    //   name: 'doubt',
    //   component: doubt,
    //   meta: {
    //     title: '全部提问'
    //   }
    // },
    // {
    //   path: '/doubtDetail',
    //   name: 'doubtDetail',
    //   component: doubtDetail,
    //   meta: {
    //     title: '提问详情'
    //   }
    // },
    {
      path: '/departure',
      name: 'departure',
      component: departure,
      meta: {
        title: '更多出发地'
      }
    },
    // {
    //   path: '/schedule',
    //   name: 'schedule',
    //   component: schedule,
    //   meta: {
    //     title: '选择日期和人数'
    //   }
    // },
    {
      path: '/buyNotes',
      name: 'buyNotes',
      component: buyNotes,
      meta: {
        title: '购买须知'
      }
    },
    {
      path: '/bookNotes',
      name: 'bookNotes',
      component: bookNotes,
      meta: {
        title: '预订须知'
      }
    },
    {
      path: '/visaNotes',
      name: 'visaNotes',
      component: visaNotes,
      meta: {
        title: '签证须知'
      }
    },
    // {
    //   path: '/resource',
    //   name: 'resource',
    //   component: resource,
    //   meta: {
    //     title: '选择资源'
    //   }
    // },
    // {
    //   path: '/fillOrder',
    //   name: 'fillOrder',
    //   component: fillOrder,
    //   meta: {
    //     title: '填写信息'
    //   }
    // },
    // {
    //   path: '/selectUser',
    //   name: 'selectUser',
    //   component: selectUser,
    //   meta: {
    //     title: '选择出行人'
    //   }
    // },
    // {
    //   path: '/searchUser',
    //   name: 'searchUser',
    //   component: searchUser,
    //   meta: {
    //     title: '查找出行人'
    //   }
    // },
    // {
    //   path: '/editUser',
    //   name: 'editUser',
    //   component: editUser,
    //   meta: {
    //     title: '编辑出行人'
    //   }
    // },
    // {
    //   path: '/addUser',
    //   name: 'addUser',
    //   component: addUser,
    //   meta: {
    //     title: '新增出行人'
    //   }
    // },
    // {
    //   path: '/invoice',
    //   name: 'invoice',
    //   component: invoice,
    //   meta: {
    //     title: '编辑发票信息'
    //   }
    // },
    // {
    //   path: '/specialNeeds',
    //   name: 'specialNeeds',
    //   component: specialNeeds,
    //   meta: {
    //     title: '特殊需求'
    //   }
    // },
    // {
    //   path: '/travels',
    //   name: 'travels',
    //   component: travels,
    //   meta: {
    //     title: '相关游记'
    //   }
    // },
    {
      path: '/*',
      name: 'routerLost',
      component: routerLost,
      meta: {
        title: '很抱歉，网页丢失了'
      }
    }
  ]
})
