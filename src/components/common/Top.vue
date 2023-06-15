<template>
<div class="box" >
    <el-col :span="4" class="left">
        <img src="@/assets/logo.png" style="width: 90%;height: 80%;margin-top: 10px;margin-left: 10px;" alt=""/>
    </el-col>

    <div class="right">
        CRM客户关系管理系统
        <el-dropdown>
    <span class="el-dropdown-link">
      {{ suName }}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>


</div>
</template>

<script>
import {getCookie,removeToken} from "@/cookie";
import {logout} from "@/api";

export default {
    name: "Top",
    data(){
        return{
            suName: getCookie("suName")
        }
    },
    methods:{
        logout(){
            logout().then(data=>{
                removeToken()
                this.$router.push("/login")
            })
        }
    }
}
</script>

<style scoped>
.box{
    position: relative;
    width: 100%;
    height: 10vh;
    background-color: black;
    color: white;
    border-bottom: black 1px solid;
    font-weight: bold;
    font-size: 20px;
    line-height: 10vh;
}

.left{
    position: absolute;
    height: 10vh;
    background-color: #545c64;
    z-index: 5;
}

.right{
    position: absolute;
    margin-left: 320px;
}

.el-dropdown-link {
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    color: #ffffff;
    margin-left: 800px;
}
.el-icon-arrow-down {
    font-size: 12px;
}

</style>