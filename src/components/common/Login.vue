<template>
    <div class="body" @keydown.enter="login">
        <div class="login">
            <p class="userLogin">账号登录</p>
            <p class=""></p>
            <div class="input">
                <el-form>
                    <el-input v-model="sysUser.suName" placeholder="账号" :prefix-icon="'el-icon-user'"></el-input>
                    <div class="divide"></div>
                    <el-input v-model="sysUser.suPwd" placeholder="密码" type="password"
                              :prefix-icon="'el-icon-tickets'"></el-input>
                </el-form>
                <div class="other">
                    <p class="check">
                        <input type="checkbox" v-model="autoLogin" id="autoLogin">
                        <label for="autoLogin" style="cursor: pointer">下次自动登录</label>
                    </p>
                    <p class="forget">
                        <el-link style="font-size: 17px" >忘记密码?</el-link>
                    </p>
                </div>
                <el-button type="primary" class="enter" @click="login">登录</el-button>
            </div>
            <p class="register">没有账号，
                <el-link type="primary" @click="register" style="font-size: 17px;margin-bottom: 3px;">去注册</el-link>
            </p>
        </div>
    </div>


</template>

<script>


import {login} from "@/api";
import {setCookie,getCookie} from "@/cookie";

export default {
    name: "Login",
    data() {
        return {
            sysUser:{
                suName:'',
                suPwd:''
            },
            autoLogin: false
        }
    },
    methods: {
        login() {
            const {suName, suPwd} = this.sysUser

            if (!(suName || suPwd)) {
                this.$message.error('请输入用户名与密码')
                return
            }

            login(JSON.stringify({suName,suPwd})).then(data => {
                if (data.data.code !== 200) {
                    this.$message({
                        type: "error",
                        message: data.data.message,
                        duration: 1500,
                    });
                    return
                }
                setCookie("token",data.data.message)
                setCookie("suName", data.data.data.suName)
                setCookie("suPwd", data.data.data.suPwd)
                setCookie("suRole", data.data.data.suRole)

                this.$message({
                    type: "success",
                    message: "登录成功 "+data.data.data.suName,
                    duration: 1500,
                })
                this.$store.dispatch("initUser", {
                    nickname: getCookie("suName"),mobilePhoneNumber:getCookie("suPwd"),
                    avatar: getCookie("suRole")
                })
                this.$router.push('/')
            })
        },
        register(){
            this.$router.push({path:'/register'})
        }
    },
    mounted() {
        if (this.$route.params.suName){
            this.sysUser.suName = this.$route.params.suName
        }
    }

}
</script>

<style scoped>
.body {
    position: fixed;
    height: 100%;
    width: 100%;
    background-image: url("@/assets/320.png");
    background-size: 100% 100%;
}

#back {
    font-size: 20px;
}

.register {
    height: 15px;
    line-height: 15px;
    font-size: 15px;
    margin-top: 50px;
    margin-left: 310px;
    position: absolute;
    bottom: 39px;
    right: 35px;
}

.login {
    opacity: 0.9;
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 70px;
    height: 500px;
    width: 500px;
    background-color: white;
}

.userLogin {
    position: fixed;
    font-size: 30px;
    margin-top: 25px;
    margin-left: 61px;
}

.other {
    height: 0;
}

.check {
    position: fixed;
    margin-top: 20px;
}

.forget {
    position: fixed;
    margin-top: 20px;
    margin-left: 280px;
}

.input {
    width: 75%;
    margin: 170px auto auto;
}

.divide {
    height: 30px;
}

.enter {
    width: 100%;
    margin: 70px auto auto;
}
</style>