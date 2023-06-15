import Home from "@/pages/Home.vue";
import CustomerInfo from "@/components/customer/CustomerInfo.vue";
import ServiceInfo from "@/components/service/ServiceInfo.vue";
import ContactInfo from "@/components/customer/ContactInfo.vue";
import BusinessRecord from "@/components/customer/BusinessRecord.vue";
import ServiceCreate from "@/components/service/ServiceCreate.vue";
import ServiceAssign from "@/components/service/ServiceAssign.vue";
import ServiceHandle from "@/components/service/ServiceHandle.vue";
import ServiceFeedback from "@/components/service/ServiceFeedback.vue";
import MarketingCreate from "@/components/marketing/MarketingCreate.vue";
import MarketingInfo from "@/components/marketing/MarketingInfo.vue";
import MarketingPlan from "@/components/marketing/MarketingPlan.vue";
import MarketingPlanCreate from "@/components/marketing/MarketingPlanCreate.vue";
import Register from "@/components/common/Register.vue";
import Login from "@/components/common/Login.vue";
import CustomerContribute from "@/components/chart/CustomerContribute.vue";
import OrdersHistory from "@/components/customer/OrdersHistory.vue";
import CustomerRateAndCredit from "@/components/chart/CustomerRateAndCredit.vue";
import CustomerServices from "@/components/chart/CustomerServices.vue";
import CustomerLoss from "@/components/chart/CustomerLoss.vue";
import LossHistory from "@/components/customer/LossHistory.vue";
import Vue from "vue";
import {getCookie} from "@/cookie";
import ManageUser from "@/components/admin/ManageUser.vue";


export default [
    {
        path: '/',
        redirect: to=>{
            return '/home'
        }
    },
    {
        path: '/home',
        component: Home,
        children:
            [
                {
                    path: '/home/customerInfo',
                    component: CustomerInfo,
                    meta:{title:'客户信息'}
                },
                {
                    path: '/home/contactInfo/:cusId',
                    component: ContactInfo,
                    meta:{title:'联系信息'}
                },
                {
                    path: '/home/serviceInfo',
                    component: ServiceInfo,
                    meta:{title:'服务信息'}
                },
                {
                    path: '/home/businessRecord',
                    component: BusinessRecord,
                    meta:{title:'交往记录'}
                },
                {
                    path: '/home/serviceCreate',
                    component: ServiceCreate,
                    meta:{title:'服务创建'}
                },
                {
                    path: '/home/serviceAssign',
                    component: ServiceAssign,
                    meta:{title:'服务分配'}

                },
                {
                    path: '/home/serviceHandle',
                    component: ServiceHandle,
                    meta:{title:'服务处理'}

                },
                {
                    path: '/home/serviceFeedback',
                    component: ServiceFeedback,
                    meta:{title:'服务反馈'}

                },
                {
                    path: '/home/marketingCreate',
                    component: MarketingCreate,
                    meta:{title:'营销创建'}

                },
                {
                    path: '/home/marketingInfo',
                    component: MarketingInfo,
                    meta:{title:'营销信息'}

                },
                {
                    path: '/home/marketingPlan',
                    component: MarketingPlan,
                    meta:{title:'营销计划'}

                },
                {
                    path: '/home/marketingPlanCreate/:saleId',
                    component: MarketingPlanCreate,
                    meta:{title:'计划创建'}

                },
                {
                    path: '/home/customerContribute',
                    component: CustomerContribute,
                    meta:{title:'客户贡献'}

                },
                {
                    path: '/home/ordersHistory',
                    component: OrdersHistory,
                    meta:{title:'订单历史'}

                },
                {
                    path: '/home/customerRateAndCredit',
                    component: CustomerRateAndCredit,
                    meta:{title:'信用图表'}

                },
                {
                    path: '/home/customerServices',
                    component: CustomerServices,
                    meta:{title:'服务图表'}

                },
                {
                    path: '/home/customerLoss',
                    component: CustomerLoss,
                    meta:{title:'流失图表'}

                },
                {
                    path: '/home/lossHistory',
                    component: LossHistory,
                    meta:{title:'流失记录'}

                },
                {
                    path: '/home/manageUser',
                    component: ManageUser,
                    meta:{title:'管理用户'}

                },
            ],
        beforeEnter: (to, from, next) => {
            if (getCookie("token")){
                next()
            }else {
                next('/login')
            }
        },
        meta:{title:'交往记录'}

    },
    {
        path: '/login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (!getCookie("token")){
                next()
            }else {
                next('/')
                Vue.prototype.$message.error({
                    message: '您已经登录'
                })
            }
        },
        meta:{title:'登录'}

    },
    {
        path: '/register',
        component: Register,
        beforeEnter: (to, from, next) => {
            if (!getCookie("token")){
                next()
            }else {
                next('/')
                Vue.prototype.$message.error({
                    message: '您已经登录'
                })
            }
        },
        meta:{title:'注册'}
    },

]