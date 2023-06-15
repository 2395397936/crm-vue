<template>
    <div class="container">
        <div>
            <el-button @click="handleService" type="primary">处理</el-button>
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
            <el-table-column
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
                    prop="cusId"
                    label="客户编号"
                    width="80"
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
                    width="200"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="servicesPerson"
                    label="处理人"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="servicesAtime"
                label="分配时间"
                width="200"
                show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                    @current-change="getAssignServiceList"
                    :page-size="pageSize"
                    background
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>

        <el-dialog
                title="处理"
                style="height: 100%;"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">

            <div class="line-box">
                <el-input type="textarea" v-model="services.servicesMethod"></el-input>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
import {getAssignServiceList, handleService} from "@/api";

export default {
    name: "ServiceHandle",
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
        }
    },

    methods: {
        getAssignServiceList(page = 1) {
            // this.NProgress.start()
            this.currentPage = page
            getAssignServiceList(JSON.stringify({"page": this.currentPage, "pageSize": this.pageSize})).then((data => {
                this.tableData = data.data.data
                this.count = data.data.count
                // this.NProgress.done()
            }))
        },
        handleService() {
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
            if (servicesPerson ===undefined) {
                this.$message.warning("请输入完整信息")
                return
            }
            handleService(this.services).then((data)=>{
                this.dialogVisible = false
                this.services = ''
                this.$message.success(data.data.message)
                this.getAssignServiceList(this.currentPage)
            })
        }
    },

    mounted() {
        this.getAssignServiceList()
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