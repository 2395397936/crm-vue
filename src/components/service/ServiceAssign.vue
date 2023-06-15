<template>
    <div class="container">
        <div>
            <el-button @click="assignService" type="primary">分配</el-button>
            <el-button @click="deleteService" type="danger">删除</el-button>
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 5px;"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                    prop="servicesType"
                    label="服务类型"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="servicesOutline"
                    label="概要"
                    width="200"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="servicesRequirement"
                    label="详细要求"
                    width="200"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="servicesCreator"
                    label="创建人"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="servicesCtime"
                    label="创建时间"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="servicesState"
                    label="状态"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                    @current-change="getNewServiceList"
                    :page-size="pageSize"
                    background
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>

        <el-dialog
                title="分配人员"
                style="height: 100%;"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">

            <div class="line-box">
                <div class="line">
                    <span class="line-title">处理人员:</span>
                    <el-select v-model="services.servicesPerson" placeholder="请选择" class="line-with">
                        <el-option v-for="item in sales"
                                   :value="item.suName"
                                   :label="item.suName"
                                   :key="item.suId"></el-option>
                    </el-select>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
import {assignService, deleteSaleChance, deleteService, getNewServiceList, getSales} from "@/api";

export default {
    name: "ServiceAssign",
    data() {
        return {
            pageSize: 10,
            count: 1,
            currentPage: 1,
            tableData: [],
            multipleSelection: [],
            selected: [],
            dialogVisible: false,
            services: {},
            sales: '',
        }
    },

    methods: {
        getNewServiceList(page = 1) {
            // this.NProgress.start()
            this.currentPage = page
            getNewServiceList(JSON.stringify({"page": this.currentPage, "pageSize": this.pageSize})).then((data => {
                this.tableData = data.data.data
                this.count = data.data.count
                // this.NProgress.done()
            }))
        },
        assignService() {
            if (this.$refs.multipleTable.selection.length !== 1) {
                this.$message.warning('请选择一条数据');
            } else {
                this.dialogVisible = true
                this.services = JSON.parse(JSON.stringify(this.$refs.multipleTable.selection[0]))
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        deleteService() {
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
                    s.push(el.servicesId)
                    console.log(el)
                })
                deleteService(JSON.stringify(s)).then((data => {
                    this.$message.success(data.data.message)
                    this.getNewServiceList(this.currentPage)
                }))
            }).catch(()=>{

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
        submit() {
            const {
                servicesPerson
            } = this.services
            if (servicesPerson === undefined) {
                this.$message.warning("请输入完整信息")
                return
            }
            assignService(this.services).then(data => {
                this.dialogVisible = false
                this.$message.success(data.data.message)
                this.getNewServiceList(this.currentPage)
            })
        }
    },

    mounted() {
        this.getNewServiceList()
        getSales().then(data => {
            this.sales = data.data.data
        })
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