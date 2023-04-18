import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/views/Layout.vue')
const Login = () => import('@/views/login/index.vue')
const Register = () => import('@/views/register/index.vue')
const personalPage = () => import('@/views/personalPage/index.vue')
const Setting = () => import('@/views/setting/index.vue')
const addressManage = () => import('@/views/addressManage/index.vue')
const addressEdit = () => import('@/views/addressEdit/index.vue')
const changeUserInfo = () => import('@/views/changeUserInfo/index.vue')
const resizePassword = () => import('@/views/resizePassword/index.vue')
const goodsDetail = () => import('@/views/goodsDetail/index.vue')
const Cart = () => import('@/views/cart/index.vue')
const WriteOrder = () => import('@/views/writeOrder/index.vue')
const Index = () => import('@/views/index/index.vue')
const Search = () => import('@/views/search/index.vue')
const Pay = () => import('@/views/pay/index.vue')
const Order = () => import('@/views/order/index.vue')
const Management = () => import('@/views/management/index.vue')
const ManagementLayout = () => import('@/views/ManagementLayout.vue')
const ApplicationManage = () => import('@/views/applicationManage/index.vue')
const SliderManage = () => import('@/views/sliderManage/index.vue')
const HelpManage = () => import('@/views/helpManage/index.vue')
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                component: Index
            },
            {
                path: '/personalPage',
                component: personalPage
            },
            {
                path: '/cart',
                component: Cart
            }
        ]
    },
    {
        path: '/setting',
        component: Setting
    },
    {
        path: '/addressManage',
        component: addressManage
    },
    {
        path: '/addressEdit',
        component: addressEdit
    },
    {
        path: '/changeUserInfo',
        component: changeUserInfo
    },
    {
        path: '/resizePassword',
        component: resizePassword
    },
    {
        path: '/goodsDetail/:id',
        component: goodsDetail
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/cartShow',
        component: Cart
    },
    {
        path: '/writeOrder',
        component: WriteOrder
    },
    {
        path: '/search',
        component: Search
    },
    {
        path: '/pay',
        component: Pay
    },
    {
        path: '/order',
        component: Order
    },
    // PC
    {
        path: '/management',
        component: Management
    },
    {
        path: '/managementIndex',
        component: ManagementLayout,
        children: [
            {
                path: 'helpManage',
                component: HelpManage,
                meta: {
                    index: "2",
                    title: "商城管理 - 帮助管理"
                }
            },
            {
                path: 'applicationManage',
                component: ApplicationManage,
                meta: {
                    index: "3",
                    title: "商城管理 - 店主申请管理"
                }
            },
            {
                path: 'sliderManage',
                component: SliderManage,
                meta: {
                    index: "4",
                    title: "商城管理 - 轮播图管理"
                }
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 前置路由守卫
router.beforeEach((to, from, next) => {
    next()
})

router.afterEach((to, from) => {
    if (to.fullPath.toLowerCase().indexOf('/manage') != -1 && to.fullPath != "/addressManage")
        document.title = to.meta.title as string ?? "商城管理后台系统"
})
export default router;