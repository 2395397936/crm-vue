<template>
    <div class="container">
        <el-form :model="saleChance" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="客户名称" prop="desc">
                <el-input type="input" v-model="saleChance.saleName"></el-input>
            </el-form-item>
            <el-form-item label="机会来源" prop="region">
                <el-select v-model="saleChance.saleChanceSource" laceholder="请选择服务类型">
                    <el-option label="促销" value="促销"></el-option>
                    <el-option label="广告" value="广告"></el-option>
                    <el-option label="搜索引擎" value="搜索引擎"></el-option>
                    <el-option label="线上咨询" value="线上咨询"></el-option>
                    <el-option label="电话咨询" value="电话咨询"></el-option>
                    <el-option label="邮件咨询" value="邮件咨询"></el-option>
                    <el-option label="客户介绍" value="客户介绍"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系人" prop="desc">
                <el-input type="input" v-model="saleChance.saleContact"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="desc">
                <el-input type="input" v-model="saleChance.salePhone"></el-input>
            </el-form-item>
            <el-form-item label="成功几率%" prop="desc">
                <el-col :span="5">
                        <el-input-number max="100" min="0" type="input" v-model="saleChance.saleChance" >

                        <i slot="suffix">%</i>
                        </el-input-number>
                </el-col>
            </el-form-item>
            <el-form-item label="概要" prop="desc">
                <el-input type="textarea" v-model="saleChance.saleDes"></el-input>
            </el-form-item>
            <el-form-item label="机会描述" prop="desc">
                <el-input type="textarea" v-model="saleChance.saleChanceDes"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {addSaleChance} from "@/api";

export default {
    name: "MarketingCreate",
    data() {
        return {
            saleChance: {},
        };
    },
    methods: {
        submitForm() {

            const {saleName, saleChanceSource, saleContact, salePhone,saleChance,saleDes,saleChanceDes} = this.saleChance
            if ((saleName&& saleChanceSource&& saleContact&& salePhone&&saleChance&&saleDes&&saleChanceDes) === undefined) {
                this.$message.warning("请输入完整数据")
                return
            }
            addSaleChance(JSON.stringify(this.saleChance)).then(data => {
                this.$message.success(data.data.message)
                this.saleChance = {}
            })
        },
        resetForm() {
            this.saleChance = {}
        }
    }
}
</script>

<style scoped>
.demo-ruleForm {
    margin-top: 50px;
    margin-left: 200px;
    width: 700px;
}
</style>