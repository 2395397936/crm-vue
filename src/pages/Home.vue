<template>
    <div>
        <el-col :span="4">
            <el-menu style="height: 90vh;margin-top: 10vh;position:relative;z-index: 5;overflow: auto"
                     router
                     :default-active="$route.path"
                     class="el-menu-vertical-demo"
                     @open="handleOpen"
                     @close="handleClose"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>营销管理</span>
                    </template>
                    <el-menu-item index="/home/marketingCreate">营销机会创建</el-menu-item>
                    <el-menu-item index="/home/marketingInfo">营销机会管理</el-menu-item>
                    <el-menu-item index="/home/marketingPlan">客户开发计划</el-menu-item>
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-user"></i>
                        <span>客户管理</span>
                    </template>
                        <el-menu-item index="/home/customerInfo">客户信息管理</el-menu-item>
                    <el-menu-item index="/home/ordersHistory">历史订单</el-menu-item>
                    <el-menu-item index="/home/lossHistory">客户流失记录</el-menu-item>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-help"></i>
                        <span>服务管理</span>
                    </template>
                    <el-menu-item index="/home/serviceInfo"  v-show="role">服务归档</el-menu-item>
                    <el-menu-item index="/home/serviceCreate">服务创建</el-menu-item>
                    <el-menu-item index="/home/serviceAssign" v-show="role">服务分配</el-menu-item>
                    <el-menu-item index="/home/serviceHandle">服务处理</el-menu-item>
                    <el-menu-item index="/home/serviceFeedback">服务反馈</el-menu-item>
                </el-submenu>

                <el-submenu index="4" v-show="role">
                    <template slot="title">
                        <i class="el-icon-view"></i>
                        <span>统计报表</span>
                    </template>
                    <el-menu-item index="/home/customerContribute">用户贡献</el-menu-item>
                    <el-menu-item index="/home/customerRateAndCredit">用户分析</el-menu-item>
                    <el-menu-item index="/home/customerServices">服务类型</el-menu-item>
                    <el-menu-item index="/home/customerLoss">客户流失</el-menu-item>
                </el-submenu>

                <el-submenu index="5" v-show="role">
                    <template slot="title">
                        <i class="el-icon-view"></i>
                        <span>系统管理</span>
                    </template>
                    <el-menu-item index="/home/manageUser">管理用户</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
        <Top/>
        <router-view style="position:absolute;width: 80%;left: 300px;margin-top: 10px"></router-view>
        <bottom/>
    </div>
</template>

<script>
import Top from "@/components/common/Top.vue";
import Bottom from "@/components/common/Bottom.vue";
import {getCookie} from "@/cookie";

export default {
    name: "Home",
    components: {Bottom, Top},
    data(){
      return{
          role:''
      }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    mounted() {
        this.role = (getCookie("suRole")!=='SALES')
    }
}
</script>

<style scoped>

</style>