<template>
    <div class="container">
        <el-form :model="services" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="服务类型" prop="region">
                <el-select v-model="services.servicesType" laceholder="请选择服务类型">
                    <el-option label="咨询" value="咨询"></el-option>
                    <el-option label="投诉" value="投诉"></el-option>
                    <el-option label="建议" value="建议"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="概要" prop="desc">
                <el-input type="textarea" v-model="services.servicesOutline"></el-input>
            </el-form-item>
            <el-form-item label="详细要求" prop="desc">
                <el-input type="textarea" v-model="services.servicesRequirement"></el-input>
            </el-form-item>
            <el-form-item label="客户编号" prop="name">
                <el-col :span="4">
                    <el-input v-model="services.cusId"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {addService} from "@/api";

export default {
    name: "ServiceCreate",
    data() {
        return {
            services: {},
        };
    },
    methods: {
        submitForm() {
            const {servicesType, servicesOutline, servicesRequirement, cusId} = this.services
            if ((servicesType && servicesOutline && servicesRequirement&& cusId) === undefined) {
                this.$message.warning("请输入完整数据")
                return
            }
            addService(JSON.stringify(this.services)).then(data => {
                this.$message.success(data.data.message)
                this.services = {}
            })
        },
        resetForm() {
            this.services = {}
        }
    }
}
</script>

<style scoped>
.demo-ruleForm {
    margin-top: 50px;
    margin-left: 100px;
    width: 700px;
}
</style>