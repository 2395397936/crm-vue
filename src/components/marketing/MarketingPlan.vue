<template>
    <div class="container">
        <div>
            <el-button @click="plan" type="primary">计划</el-button>
            <el-button @click="deleteCustomer" type="danger">删除</el-button>
            <el-button @click="devResult(1)" type="success">开发成功</el-button>
            <el-button @click="devResult(0)" type="warning">开发失败</el-button>

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
                    @current-change="getAssignSaleChanceList"
                    :page-size="pageSize"
                    background
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {
    addDevPlan,
    assignSaleChance,
    deleteSaleChance,
    getAssignSaleChanceList, resultDevPlan,
    updateDevPlan
} from "@/api";

export default {
    name: "MarketingPlan.vue",
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
            devPlan: {
                dpContent: '',
                dpTime:'',
                saleId:''
            },
            saleChance: {},
            gridData: [],
            status: 0,
        }
    },

    methods: {
        getAssignSaleChanceList(page = 1) {
            // this.NProgress.start()
            this.currentPage = page
            getAssignSaleChanceList(JSON.stringify({"page": this.currentPage, "pageSize": this.pageSize})).then((data => {
                this.tableData = data.data.data
                this.count = data.data.count
                // this.NProgress.done()
            }))
        },
        plan() {
            if (this.$refs.multipleTable.selection.length === 0) {
                this.$message.warning("请选择一条数据")
                return
            }
            this.$router.push({path:'/home/marketingPlanCreate/'+this.$refs.multipleTable.selection[0].saleId})
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        deleteCustomer() {
            if (this.$refs.multipleTable.selection.length === 0) {
                this.$message.warning("请选择数据")
                return
            }
            let s = []
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
                    this.getAssignSaleChanceList(this.currentPage)
                }))
            }).catch(()=>{

            })

        },
        devResult(status) {
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning("请选择一条数据")
                return
            }
            this.saleChance = this.$refs.multipleTable.selection[0]
            if (status===1){
                this.saleChance.saleState="开发成功"
            }else {
                this.saleChance.saleState="开发成功"
            }
            resultDevPlan(this.saleChance).then(data=>{
                this.$message.success(data.data.message)
                this.getAssignSaleChanceList(this.currentPage)
            })

        },
        submitAssign() {
            assignSaleChance(this.saleChance).then(data => {
                this.dialogAssignVisible = false
                this.$message.success(data.data.message)
                this.getAssignSaleChanceList(this.currentPage)
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
                dpContent,dpTime
            } = this.devPlan
            if ((dpContent&&dpTime) === "") {
                this.$message.warning("请输入完整数据")
                return
            }
            if (this.status===1){
                updateDevPlan(JSON.stringify(this.devPlan)).then(data => {
                    this.dialogVisible = false
                    this.getAssignSaleChanceList(this.currentPage)
                    this.$message.success(data.data.message)
                })
            }else {
                addDevPlan(JSON.stringify(this.devPlan)).then(data => {
                    this.dialogVisible = false
                    this.getAssignSaleChanceList(this.currentPage)
                    this.$message.success(data.data.message)
                })
            }

        },

    },

    mounted() {
        this.getAssignSaleChanceList()
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