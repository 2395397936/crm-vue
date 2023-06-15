<template>
    <div class="container">
        <div>
            <el-button @click="updateSaleChance" type="primary">修改</el-button>
            <el-button @click="deleteCustomer" type="danger">删除</el-button>
            <el-button @click="assign" type="success">分配</el-button>
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 5px;"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="saleName" label="客户名称" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="saleChanceSource" label="机会来源" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="saleContact" label="联系人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="salePhone" label="联系电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="成功几率" show-overflow-tooltip>
                <template mplate slot-scope="scope">{{ scope.row.saleChance}}%</template>
            </el-table-column>
            <el-table-column prop="saleDes" label="概要" show-overflow-tooltip></el-table-column>
            <el-table-column prop="saleChanceDes" label="机会描述" show-overflow-tooltip></el-table-column>
            <el-table-column prop="saleState" label="机会状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="saleCreator" label="创建人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="saleAssignedTo" label="处理人" show-overflow-tooltip></el-table-column>

        </el-table>
        <div class="page">
            <el-pagination
                    @current-change="getSaleChance"
                    :page-size="pageSize"
                    background
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>

        <el-dialog
                title="修改"
                style="height: 100%;"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
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

            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm">提 交</el-button>
  </span>
        </el-dialog>

        <el-dialog
                title="分配人员"
                style="height: 100%;"
                :visible.sync="dialogAssignVisible"
                width="30%"
                :before-close="handleClose">

            <div class="line-box">
                <div class="line">
                    <span class="line-title">处理人员:</span>
                    <el-select v-model="saleChance.saleAssignedTo" placeholder="请选择" class="line-with">
                        <el-option v-for="item in sales"
                                   :value="item.suName"
                                   :label="item.suName"
                                   :key="item.suId"></el-option>
                    </el-select>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogAssignVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitAssign">提 交</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
import {assignSaleChance, deleteSaleChance, getSaleChance, getSales, updateSaleChance} from "@/api";

export default {
    name: "MarketingCreate.vue",
    data() {
        return {
            pageSize: 10,
            count: 1,
            currentPage: 1,
            tableData: [],
            multipleSelection: [],
            selected: [],
            dialogVisible: false,
            dialogAssignVisible: false,
            title: "",
            saleChance: {},
            gridData: [],
            sales:[]
        }
    },

    methods: {
        getSaleChance(page = 1) {
            // this.NProgress.start()
            this.currentPage = page
            getSaleChance(JSON.stringify({"page": this.currentPage, "pageSize": this.pageSize})).then((data => {
                this.tableData = data.data.data
                this.count = data.data.count
                // this.NProgress.done()
            }))
        },
        updateSaleChance() {
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning("请选择一条数据")
                return
            }

            if (this.$refs.multipleTable.selection[0].saleState !== '未分配') {
                this.$message.warning("请选择未分配数据")
                return
            }

            this.saleChance = JSON.parse(JSON.stringify(this.$refs.multipleTable.selection[0]))
            this.dialogVisible = true
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        deleteCustomer() {
            let s = []
            if (this.$refs.multipleTable.selection.length === 0) {
                this.$message.warning("请选择数据")
                return
            }
            this.$confirm('确定删除', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.$refs.multipleTable.selection.forEach(function (el) {
                    s.push(el.saleId)
                })
                deleteSaleChance(JSON.stringify(s)).then((data => {
                    this.$message.success(data.data.message)
                    this.getSaleChance(this.currentPage)
                }))
            }).catch(()=>{

            })

        },
        assign() {
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning("请选择一条数据")
                return
            }
            if (this.$refs.multipleTable.selection[0].saleState !== '未分配') {
                this.$message.warning("请选择未分配数据")
                return
            }
            getSales().then(data=>{
                this.sales = data.data.data
                this.saleChance = this.$refs.multipleTable.selection[0]
                this.dialogAssignVisible = true
            })


        },
        submitAssign() {
            assignSaleChance(this.saleChance).then(data => {
                this.dialogAssignVisible = false
                this.$message.success(data.data.message)
                this.getSaleChance(this.currentPage)
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {
                });
        },
        submitForm() {
            const {
                saleName,
                saleChanceSource,
                saleContact,
                salePhone,
                saleChance,
                saleDes,
                saleChanceDes
            } = this.saleChance
            if ((saleName && saleChanceSource && saleContact && salePhone && saleChance && saleDes && saleChanceDes) === "") {
                this.$message.warning("请输入完整数据")
                return
            }
            updateSaleChance(JSON.stringify(this.saleChance)).then(data => {
                this.dialogVisible = false
                this.getSaleChance(this.currentPage)

                this.$message.success(data.data.message)
            })
        },

    },

    mounted() {
        this.getSaleChance()
    }
}
</script>

<style scoped>
.container {

}

.page {
    position: fixed;
    bottom: 50px;
    margin-left: 100px;
}

.line-box {
    height: 30px;
    margin-bottom: 20px;
}

.line {
    position: relative;
}

.line-title {
    top: 10px;
    left: 20px;
    position: absolute;
}

.line-with {
    right: 20px;
    width: 300px;
    position: absolute;
}
</style>