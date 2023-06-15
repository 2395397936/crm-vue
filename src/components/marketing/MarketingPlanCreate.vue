<template>
    <div class="container">
        <div>
            <el-button @click="plan" type="primary">计划</el-button>
            <el-button @click="update" type="info">修改</el-button>
            <el-button @click="execute" type="success">执行</el-button>
            <el-button @click="deleteDevPlan" type="danger">删除</el-button>
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 5px;"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="dpContent" label="计划内容" show-overflow-tooltip></el-table-column>
            <el-table-column  label="计划日期" width="120">
                <template mplate slot-scope="scope">{{ scope.row.dpTime.substring(0,10)}}</template>
            </el-table-column>
            <el-table-column label="执行日期" width="120">
                <template mplate slot-scope="scope">{{ scope.row.dpExecutionTime?scope.row.dpExecutionTime.substring(0,10):''}}</template>
            </el-table-column>
            <el-table-column prop="dpExecutionResult" label="执行结果" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dpExecutor" label="执行人" show-overflow-tooltip></el-table-column>

        </el-table>
        <div class="page">
            <el-pagination
                    @current-change="getDevPlan"
                    :page-size="pageSize"
                    background
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>
        <el-dialog
                :title="title"
                style="height: 100%;"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form :model="devPlan" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="计划内容" prop="desc">
                    <el-input type="textarea" v-model="devPlan.dpContent"></el-input>
                </el-form-item>
                <el-form-item label="计划日期" prop="desc">
                    <el-date-picker
                        v-model="devPlan.dpTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择计划日期">
                    </el-date-picker>
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
            <el-form :model="devPlan" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="执行" prop="desc">
                    <el-input type="textarea" v-model="devPlan.dpExecutionResult"></el-input>
                </el-form-item>
                <el-form-item label="执行日期" prop="desc">
                    <el-date-picker
                        v-model="devPlan.dpExecutionTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择执行日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogAssignVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitExecute">提 交</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
import {
    addDevPlan,
    assignSaleChance, deleteDevPlan,
    deleteSaleChance, executeDevPlan,
    getDevPlan,
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
                saleId: this.saleId
            },
            saleChance: {},
            gridData: [],
            status: 0,
            saleId:1,
        }
    },

    methods: {
        getDevPlan(page = 1) {
            // this.NProgress.start()
            this.currentPage = page
            getDevPlan(this.saleId,JSON.stringify({"page": this.currentPage, "pageSize": this.pageSize})).then((data => {
                this.tableData = data.data.data
                this.count = data.data.count
                // this.NProgress.done()
            }))
        },
        plan() {
            this.devPlan = {}
            this.title = "制定计划"
            this.dialogVisible = true
            this.status = 0
        },
        update(){
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning("请选择一条数据")
                return
            }
            this.devPlan = this.$refs.multipleTable.selection[0]
            this.title = "修改计划"
            this.dialogVisible = true
            this.status = 1
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        deleteDevPlan() {
            let s = []
            if (this.$refs.multipleTable.selection.length === 0) {
                this.$message.warning("请选择一条数据")
                return
            }
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
                    s.push(el.dpId)
                })
                deleteDevPlan(JSON.stringify(s)).then((data => {
                    this.$message.success(data.data.message)
                    this.getDevPlan(this.currentPage)
                }))
            }).catch(()=>{

            })

        },
        execute() {
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning("请选择一条数据")
                return
            }
            if (this.$refs.multipleTable.selection[0].dpExecutionResult !== null) {
                this.$message.warning("请选择未执行计划")
                return
            }
            this.devPlan = JSON.parse(JSON.stringify(this.$refs.multipleTable.selection[0]))
            this.dialogAssignVisible = true

        },
        submitExecute() {
            executeDevPlan(JSON.stringify(this.devPlan)).then(data => {
                this.dialogAssignVisible = false
                this.$message.success(data.data.message)
                this.getDevPlan(this.currentPage)
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
            this.devPlan.saleId = this.saleId
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
                    this.getDevPlan(this.currentPage)
                    this.$message.success(data.data.message)
                })
            }else {
                addDevPlan(JSON.stringify(this.devPlan)).then(data => {
                    this.dialogVisible = false
                    this.getDevPlan(this.currentPage)
                    this.$message.success(data.data.message)
                })
            }
            this.devPlan.dpContent = ''
            this.devPlan.dpTime = ''
        },

    },

    mounted() {
        this.saleId = this.$route.params.saleId
        this.getDevPlan()
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