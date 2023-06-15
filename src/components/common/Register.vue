<template>
    <div class="body">
        <div class="register">
            <p class="userLogin">账号注册</p>


            <div>
                <div class="input">
                    <el-form>
                        <el-input v-model="suName" placeholder="用户名" :prefix-icon="'el-icon-user'"
                                  :suffix-icon=nicknameSuffix></el-input>
                        <div class="inputTip">昵称由2-6位字符组成</div>
                        <div class="divide"></div>
                        <el-input v-model="suPwd" placeholder="密码" :prefix-icon="'el-icon-tickets'"
                                  :suffix-icon=passwordSuffix type="password"></el-input>
                        <div class="inputTip">密码由6-11位字符组成</div>
                        <div class="divide"></div>
                        <el-input v-model="repassword" placeholder="确认密码" :prefix-icon="'el-icon-tickets'"
                                  :suffix-icon=repasswordSuffix type="password"></el-input>
                        <div class="divide"></div>
                        <el-form-item label="身份：">
                            <el-radio-group v-model="role">
                                <el-radio label="SALES"></el-radio>
                                <el-radio label="MANAGER"></el-radio>
                                <el-radio label="ADMIN"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-input v-model="inviteCode" placeholder="邀请码" :prefix-icon="'el-icon-medal'"
                                  v-show="status==='1'"></el-input>


                    </el-form>
                    <el-button type="primary" class="enter" @click="register">注册</el-button>
                </div>
            </div>

            <p class="login">
                <span style="position:absolute;bottom: 0;right: 20px;width: 100px;">已有账号，</span>
                <el-link type="primary" @click="login" style="font-size: 16px">去登录</el-link>
            </p>
        </div>
    </div>

</template>

<script>
import {register} from '@/api'
export default {
    name: "Register",
    data() {
        return {
            show: true,
            status: '',
            suName: '',
            suPwd: '',
            repassword: '',
            email: '',
            isSending: false,
            countDownNum: 60,
            timer: '',
            code: '',
            nicknameSuffix: '',
            passwordSuffix: '',
            repasswordSuffix: '',
            emailSuffix: '',
            inviteCode: '',
            role: '',
        }
    },

    methods: {
        login() {
            this.$router.push("/login")
        },


        register() {
            let {suName, suPwd, repassword, role} = this

            if (!(suName && suPwd && role)) {
                this.$message.error('请输入完整信息')
                return
            }
            if (suName.length > 6 || suPwd.length < 2) {
                this.$message.error('请输入2-6位名字')
                return
            }
            if (suPwd.length < 6 || suPwd.length > 11) {
                this.$message.error('请输入6-11位以下密码')
                return
            }
            if (suPwd !== repassword) {
                this.$message.error('密码与确认密码不一致')
                return
            }
            register(JSON.stringify({suName, suPwd, suRole:role})).then((data) => {
                if (data.data.code!==200){
                    this.$message.error(data.data.message)
                    return
                }
                this.$router.push({
                    path: '/login',
                    params: {suName}
                })
            })
        },
    },
    watch: {
        suName() {
            if (this.suName.length > 11 || this.suName.length < 2) {
                this.nicknameSuffix = 'el-icon-close'
            } else {
                this.nicknameSuffix = 'el-icon-check'
            }
        },
        suPwd() {
            if (this.suPwd === this.repassword) {
                this.repasswordSuffix = 'el-icon-check'
            } else {
                this.repasswordSuffix = 'el-icon-close'
            }
            if (this.suPwd.length < 6 || this.suPwd.length > 11) {
                this.passwordSuffix = 'el-icon-close'
            } else {
                this.passwordSuffix = 'el-icon-check'
            }
        },
        repassword() {
            if (this.suPwd === this.repassword) {
                this.repasswordSuffix = 'el-icon-check'
            } else {
                this.repasswordSuffix = 'el-icon-close'
            }
        },
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

.el-icon-user-solid, .el-icon-user {
    margin-right: 35px;
    font-size: 45px;
}

button {
    width: 300px;
    align-content: center;
}

.tip {
    position: fixed;
    font-size: 15px;
    margin-top: 90px;
    margin-left: 61px;
}

.student {
    position: fixed;
    align-content: center;
    margin-left: 30px;
    margin-top: 190px;
}

.teacher {
    position: fixed;
    margin-left: 30px;
    margin-top: 280px;
}

.login {
    position: absolute;
    bottom: 20px;
    right: 40px;;
}

.register {
    opacity: 0.9;
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 70px;
    height: 540px;
    width: 500px;
    background-color: white;
}

.inputTip {
    position: absolute;
    font-size: 10px;
    color: #838080;
}

.userLogin {
    position: fixed;
    font-size: 30px;
    margin-top: 25px;
    margin-left: 61px;
}

.input {
    width: 75%;
    margin: 80px auto auto;
}

.divide {
    height: 30px;
}

.enter {
    width: 100%;
    margin: 20px auto auto;
}
</style>